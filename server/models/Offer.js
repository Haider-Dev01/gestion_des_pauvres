const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Offer = sequelize.define('Offer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // e.g., Vêtement, Meuble, Alimentaire
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('EN_ATTENTE', 'ACCEPTE', 'REFUSE'),
    defaultValue: 'EN_ATTENTE'
  },
  motifRefus: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateCreation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Offer;
