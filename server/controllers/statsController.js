const { Offer, Distribution, StockItem } = require('../models');

exports.getStats = async (req, res) => {
  try {
    const totalOffers = await Offer.count();
    const acceptedOffers = await Offer.count({ where: { statut: 'ACCEPTE' } });
    const stockCount = await StockItem.count({ where: { statut: ['GARDE_MEUBLES', 'DEPOT_VENTE'] } });
    const distributions = await Distribution.count();
    
    res.json({
      totalOffers,
      acceptedOffers,
      stockCount,
      distributions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
