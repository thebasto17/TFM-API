import mongoose, { Schema, Document } from 'mongoose';

export interface IAddressMapping extends Document {
  moneroTxId: string;
  moneroTxKey: string;
  ethereumAddress: string;
  asset: string;
}

// todo: afegir validaciones per eth addresses y monero tx key
const AddressMappingSchema: Schema = new Schema({
  moneroTxId: { type: String, required: true, unique: true },
  moneroTxKey: { type: String, required: true, unique: true },
  ethereumAddress: { type: String, required: true },
  asset: { type: String, required: true },
});

AddressMappingSchema.index({ moneroTxId: 1, moneroTxKey: 1 }, { unique: true });

export default mongoose.model<IAddressMapping>('AddressMapping', AddressMappingSchema);