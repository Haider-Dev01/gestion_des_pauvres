const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const offerController = require('../controllers/offerController');
const stockController = require('../controllers/stockController');
const distributionController = require('../controllers/distributionController');
const statsController = require('../controllers/statsController');
const chatController = require('../controllers/chatController');
const verifyToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

// Auth (Public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Offers (Authenticated users)
router.post('/offers', verifyToken, offerController.createOffer);
router.get('/offers', verifyToken, offerController.getOffers);
router.put('/offers/:id/status', verifyToken, authorize('ADMIN'), offerController.updateOfferStatus); // Only Admin approves
router.get('/offers/:id/pdf', verifyToken, offerController.generatePDF);

// Stock (Admin & Transporteur)
router.get('/stock', verifyToken, authorize(['ADMIN', 'TRANSPORTEUR']), stockController.getStock);
router.post('/stock/:id/qrcode', verifyToken, authorize(['ADMIN', 'TRANSPORTEUR']), stockController.generateQRCode);
router.put('/stock/:id/location', verifyToken, authorize(['ADMIN', 'TRANSPORTEUR']), stockController.updateLocation);

// Distribution (Admin only)
router.post('/distribution', verifyToken, authorize('ADMIN'), distributionController.createDistribution);

// Stats (Admin only)
router.get('/stats', verifyToken, authorize('ADMIN'), statsController.getStats);

// Chatbot (Public or Auth - decided public for help access, but could be auth)
// Keeping public for accessibility, or authenticate if context needed.
// user requested "improve chatbot", keeping public for now to ensure no friction, 
// unless personalization is needed. Re-reading plan: "Enrichissement de la logique". 
// Let's keep it public for general queries, but if we had user context it would be better. 
// For now, leave public to avoid breaking existing "guest" usage if any.
router.post('/chat', chatController.processMessage);

module.exports = router;
