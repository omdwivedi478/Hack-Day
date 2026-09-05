export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please authenticate'
      });
    }

    const userRole = (req.user.role || '').toLowerCase();
    const hasRole = allowedRoles.some(r => r.toLowerCase() === userRole);

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: role '${req.user.role}' does not have permission to access this resource`
      });
    }

    next();
  };
};

export const requireFarmer = requireRole('farmer', 'admin');
export const requireBuyer = requireRole('buyer', 'admin');
export const requireAdmin = requireRole('admin');
