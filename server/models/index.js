const sequelize = require('../config/database');
const User = require('./User');
const Offer = require('./Offer');
const StockItem = require('./StockItem');
const Distribution = require('./Distribution');

// Relations
User.hasMany(Offer, { foreignKey: 'userId' });
Offer.belongsTo(User, { foreignKey: 'userId' });

Offer.hasOne(StockItem, { foreignKey: 'offerId' });
StockItem.belongsTo(Offer, { foreignKey: 'offerId' });

StockItem.hasOne(Distribution, { foreignKey: 'stockItemId' });
Distribution.belongsTo(StockItem, { foreignKey: 'stockItemId' });

User.hasMany(Distribution, { foreignKey: 'beneficiaireId' }); // Pour les dons
Distribution.belongsTo(User, { as: 'Beneficiaire', foreignKey: 'beneficiaireId' });

module.exports = {
  sequelize,
  User,
  Offer,
  StockItem,
  Distribution
};
