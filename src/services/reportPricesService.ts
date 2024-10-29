import axios from 'axios';
import * as cheerio from 'cheerio';
import { linkForParsing } from '../utils/constants';
import ReportPriceModel from '../models/ReportPriceModel'; 

interface RegionData {
  priceZone: string;
  regions: string[];
}

interface TariffData {
  tariff: string;
  prices: string[];
}

interface ParsedData {
  regionsData: RegionData[];
  tariffsData: TariffData[];
}

export const reportPriceParser = async (): Promise<ParsedData> => {
  try {
    const { data } = await axios.get(linkForParsing.url);
    const $ = cheerio.load(data);
    const regionsData: RegionData[] = [];
    const tariffsData: TariffData[] = [];

    $('table tr').each((_, element) => {
      const priceZone = $(element).find('td:nth-child(1)').text().trim();
      const regionsText = $(element).find('td:nth-child(2)').text().trim();

      if (priceZone.includes('Зона') && regionsText) {
        const regions = regionsText.split(/,|\n/).map((region) => region.trim()).filter(Boolean);
        regionsData.push({ priceZone, regions });
      }
    });

    // Сохраняем данные в базу
    await ReportPriceModel.deleteMany(); // Удаляем предыдущие данные
    await ReportPriceModel.insertMany(regionsData.map(({ priceZone, regions }) => ({ priceZone,regions })));

    return { regionsData, tariffsData };
  } catch (error) {
    console.error('Ошибка при парсинге данных:', error);
    return { regionsData: [], tariffsData: [] };
  }
};
