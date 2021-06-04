export const iconColor = "#1890ff";

export const formatListingPrice = (price: number, round: boolean = true) => {
  const formattedListingPrice = round ? Math.round(price / 100) : price / 100;
  return `$${formattedListingPrice}`;
};
