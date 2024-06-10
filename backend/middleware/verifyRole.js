const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.role) {
      return res.status(403).json({ message: "Forbidden, no role" });
    }

    const rolesArray = [...allowedRoles];
    if (!rolesArray.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden, invalid role" });
    }
    next();
  };
};

module.exports = verifyRole;
