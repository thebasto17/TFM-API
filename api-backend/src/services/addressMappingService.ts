import AddressMapping, { IAddressMapping } from '../models/addressMapping';

export const createMapping = async (addressMapping: IAddressMapping): Promise<IAddressMapping> => {
  const mapping = new AddressMapping(addressMapping);
  return await mapping.save();
};

export const listMappings = async (): Promise<IAddressMapping[]> => {
  return await AddressMapping.find();
}

export const getMapping = async (moneroTxId: string, moneroTxKey: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOne({ moneroTxId, moneroTxKey });
};

export const updateMapping = async (moneroTxId: string, moneroTxKey: string, addressMapping: IAddressMapping): Promise<IAddressMapping | null> => {

  return AddressMapping.findOneAndUpdate({ moneroTxId, moneroTxKey }, addressMapping, {new: true});
};

export const deleteMapping = async (moneroTxId: string, moneroTxKey: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndDelete({ moneroTxId, moneroTxKey });
};