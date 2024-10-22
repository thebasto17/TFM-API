import AddressMapping, { IAddressMapping } from '../models/addressMapping';

export const createMapping = async (addressMapping: IAddressMapping): Promise<IAddressMapping> => {
  const mapping = new AddressMapping(addressMapping);
  return await mapping.save();
};

export const listMappings = async (): Promise<IAddressMapping[]> => {
  return await AddressMapping.find();
}

export const getMapping = async (randomNumber: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOne({ randomNumber });
};

export const updateMapping = async (randomNumber: string, addressMapping: IAddressMapping): Promise<IAddressMapping | null> => {

  return AddressMapping.findOneAndUpdate({ randomNumber }, addressMapping, {new: true});
};

export const deleteMapping = async (randomNumber: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndDelete({ randomNumber });
};