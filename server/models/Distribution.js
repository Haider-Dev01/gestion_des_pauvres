const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Distribution = sequelize.define('Distribution', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('DON', 'VENTE'),
    allowNull: false
  },
  montant: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Distribution;
