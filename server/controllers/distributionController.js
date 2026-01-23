const { Distribution, StockItem } = require('../models');

exports.createDistribution = async (req, res) => {
  try {
    const { stockItemId, type, beneficiaireId, montant } = req.body;
    
    const item = await StockItem.findByPk(stockItemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const dist = await Distribution.create({ stockItemId, type, beneficiaireId, montant });
    
    item.statut = type === 'DON' ? 'DONNE' : 'VENTE';
    await item.save();

    res.status(201).json(dist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
