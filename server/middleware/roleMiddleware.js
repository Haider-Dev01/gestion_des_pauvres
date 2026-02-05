const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. 'ADMIN') or an array of roles (['ADMIN', 'TRANSPORTEUR'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit : Rôle insuffisant' });
    }

    next();
  };
};

module.exports = authorize;
