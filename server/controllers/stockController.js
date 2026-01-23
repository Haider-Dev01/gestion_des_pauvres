const { StockItem, Offer } = require('../models');
const QRCode = require('qrcode');

exports.getStock = async (req, res) => {
  try {
    const stock = await StockItem.findAll({ include: Offer });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateQRCode = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await StockItem.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const qrData = `STOCK-${item.id}-${Date.now()}`;
    item.qrCode = qrData;
    await item.save();

    const qrImage = await QRCode.toDataURL(qrData);
    res.json({ qrCode: qrData, image: qrImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lieu } = req.body;
    const item = await StockItem.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.lieu = lieu;
    if (item.statut === 'EN_TRANSIT') item.statut = 'GARDE_MEUBLES'; // Default after transit
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
