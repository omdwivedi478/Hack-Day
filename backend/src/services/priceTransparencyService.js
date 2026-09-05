/**
 * Price Transparency Calculation Service
 * Compares direct FarmDirect fair price with traditional 4-tier middleman supply chain
 */
export const calculatePriceTransparency = ({
  price,
  farmerPrice,
  marketPrice,
  logisticsFee = 4,
  platformFee = 4
}) => {
  const farmDirectConsumerPrice = Number(price);
  const farmDirectFarmerPrice = farmerPrice || Math.round(farmDirectConsumerPrice * 0.79);

  // Traditional baseline calculations
  const traditionalConsumerPrice = marketPrice || Math.round(farmDirectConsumerPrice * 1.18);
  const traditionalFarmerPrice = Math.round(farmDirectConsumerPrice * 0.47);

  // Markups avoided
  const farmerGain = farmDirectFarmerPrice - traditionalFarmerPrice;
  const farmerGainPercent = traditionalFarmerPrice > 0
    ? Math.round((farmerGain / traditionalFarmerPrice) * 100)
    : 0;

  const consumerSaving = traditionalConsumerPrice - farmDirectConsumerPrice;
  const consumerSavingPercent = traditionalConsumerPrice > 0
    ? Math.round((consumerSaving / traditionalConsumerPrice) * 100)
    : 0;

  return {
    farmDirect: {
      consumerPrice: farmDirectConsumerPrice,
      farmerPrice: farmDirectFarmerPrice,
      logisticsFee,
      platformFee,
      farmerSharePercent: Math.round((farmDirectFarmerPrice / farmDirectConsumerPrice) * 100)
    },
    traditional: {
      consumerPrice: traditionalConsumerPrice,
      farmerPrice: traditionalFarmerPrice,
      traderPrice: Math.round(farmDirectConsumerPrice * 0.63),
      wholesalerPrice: Math.round(farmDirectConsumerPrice * 0.79),
      retailerPrice: Math.round(farmDirectConsumerPrice * 1.05)
    },
    metrics: {
      farmerGain,
      farmerGainPercent,
      consumerSaving,
      consumerSavingPercent
    }
  };
};
