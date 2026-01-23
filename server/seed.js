const { sequelize, User, Offer, StockItem } = require('./models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await sequelize.sync({ force: true });

  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await User.create({
    nom: 'Admin',
    prenom: 'System',
    email: 'admin@espoir.org',
    password: hashedPassword,
    role: 'ADMIN',
    telephone: '0102030405',
    adresse: 'Siège Asso'
  });

  console.log('Admin user created: admin@espoir.org / admin123');

  const donateur = await User.create({
    nom: 'Ghribi',
    prenom: 'Haider',
    email: 'haider.ghribi@gmail.com',
    password: hashedPassword,
    role: 'DONATEUR',
    telephone: '0607080910',
    adresse: '10 rue de la Paix'
  });

  const offer = await Offer.create({
    description: 'Lot de vêtements hiver',
    type: 'Vêtement',
    userId: donateur.id,
    statut: 'EN_ATTENTE'
  });

  console.log('Sample data created');
  process.exit();
};

seed();
