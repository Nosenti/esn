const isLogin = async (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    }
  } catch (err) {
    res.status(400).json({
      status: "auth-failure",
      error: err.message,
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({
      status: 'auth-failure',
      error: 'Access denied. Requires admin role.',
    });
  }
};

const ensureActiveUser = async(req, res, next)=> {
  
}

export {isLogin, isAdmin}

