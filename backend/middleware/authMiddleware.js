



/**
 * @param     req:  Express request object
 * @param     res:  Express response object
 * @param     next: Express next function
 * @summary   Proceeds with the next function if the user is authenticated
 */

export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: "Account not authenticated",
    });
  }

  next();
};