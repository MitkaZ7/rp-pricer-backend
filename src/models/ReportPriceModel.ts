import mongoose, { Schema, Document } from 'mongoose';

interface IReportPrice extends Document {
  priceZone: string;
  regions: string[];
}

const ReportPriceSchema: Schema = new Schema({
  priceZone: { type: String, required: true },
  regions: { type: [String], required: true },
});

const ReportPriceModel = mongoose.model<IReportPrice>('ReportPrice', ReportPriceSchema);

export default ReportPriceModel;
