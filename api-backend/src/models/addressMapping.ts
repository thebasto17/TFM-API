import mongoose, { Schema, Document } from 'mongoose';

export interface IAddressMapping extends Document {
  ethereumAddress: string;
  randomNumber: string;
  assetAddress: string;
  assetPrice: string;
  amountToTransfer: string;
}

// todo: afegir validaciones per eth addresses y monero tx key
const AddressMappingSchema: Schema = new Schema({
  ethereumAddress: { type: String, required: true },
  randomNumber: { type: String, required: true, unique: true },
  assetAddress: { type: String, required: true },
  assetPrice: { type: String, required: true },
  amountToTransfer: { type: String, required: true },
});

AddressMappingSchema.index({ ethereumAddress: 1, randomNumber: 1 }, { unique: true });

export default mongoose.model<IAddressMapping>('AddressMapping', AddressMappingSchema);