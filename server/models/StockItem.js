const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StockItem = sequelize.define('StockItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  qrCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true // Généré après acceptation
  },
  statut: {
    type: DataTypes.ENUM('EN_TRANSIT', 'GARDE_MEUBLES', 'DEPOT_VENTE', 'VENTE', 'DONNE', 'DISTRIBUE'),
    defaultValue: 'EN_TRANSIT'
  },
  lieu: {
    type: DataTypes.ENUM('GARAGE', 'ENTREPOT', 'DEPOT_COMMERCIAL', 'AUCUN'),
    defaultValue: 'AUCUN'
  },
  dateEntree: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = StockItem;
