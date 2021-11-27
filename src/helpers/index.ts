export const getSlicedAddress = (address: string) =>
  `${address.slice(0, 5)}...${address.slice(-3)}`;
