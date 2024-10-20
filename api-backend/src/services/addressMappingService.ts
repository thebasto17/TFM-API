import AddressMapping, { IAddressMapping } from '../models/addressMapping';

export const createMapping = async (addressMapping: IAddressMapping): Promise<IAddressMapping> => {
  const mapping = new AddressMapping(addressMapping);
  return await mapping.save();
};

export const listMappings = async (): Promise<IAddressMapping[]> => {
  return await AddressMapping.find();
}

export const getMapping = async (ethereumAddress: string, randomNumber: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOne({ ethereumAddress, randomNumber });
};

export const updateMapping = async (ethereumAddress: string, randomNumber: string, addressMapping: IAddressMapping): Promise<IAddressMapping | null> => {

  return AddressMapping.findOneAndUpdate({ ethereumAddress, randomNumber }, addressMapping, {new: true});
};

export const deleteMapping = async (ethereumAddress: string, randomNumber: string): Promise<IAddressMapping | null> => {
  return await AddressMapping.findOneAndDelete({ ethereumAddress, randomNumber });
};