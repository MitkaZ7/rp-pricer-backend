import mongoose, { Document, Schema} from 'mongoose';

export interface IRegion extends Document {
    priceZone: string;
    regions: string[];
}

const regionSchema = new Schema<IRegion>({
    priceZone: { type: String, required: true},
    regions: { type: [String], required: true}
});

const Region = mongoose.model<IRegion>('Region', regionSchema);
export default Region;