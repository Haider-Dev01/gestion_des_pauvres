const { Offer, StockItem, User } = require('../models');
const PDFDocument = require('pdfkit');

exports.createOffer = async (req, res) => {
  try {
    const { description, type, userId } = req.body;
    const offer = await Offer.create({ description, type, userId });
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.findAll({ include: User });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut, motifRefus } = req.body;
    const offer = await Offer.findByPk(id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    offer.statut = statut;
    if (statut === 'REFUSE') offer.motifRefus = motifRefus;
    await offer.save();

    if (statut === 'ACCEPTE') {
      // Create Stock Item automatically
      await StockItem.create({ offerId: offer.id });
    }

    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByPk(id, { include: User });
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=offer-${id}.pdf`);
    doc.pipe(res);

    doc.fontSize(25).text('Fiche Offre de Don', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`ID: ${offer.id}`);
    doc.text(`Description: ${offer.description}`);
    doc.text(`Type: ${offer.type}`);
    doc.text(`Donateur: ${offer.User.nom} ${offer.User.prenom}`);
    doc.text(`Statut: ${offer.statut}`);
    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
