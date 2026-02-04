const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');
const stockController = require('../controllers/stockController');
const distributionController = require('../controllers/distributionController');
const statsController = require('../controllers/statsController');
const chatController = require('../controllers/chatController');

// Auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Offers
router.post('/offers', offerController.createOffer);
router.get('/offers', offerController.getOffers);
router.put('/offers/:id/status', offerController.updateOfferStatus);
router.get('/offers/:id/pdf', offerController.generatePDF);

// Stock
router.get('/stock', stockController.getStock);
router.post('/stock/:id/qrcode', stockController.generateQRCode);
router.put('/stock/:id/location', stockController.updateLocation);

// Distribution
router.post('/distribution', distributionController.createDistribution);

// Stats
router.get('/stats', statsController.getStats);

// Chatbot
router.post('/chat', chatController.processMessage);

module.exports = router;
