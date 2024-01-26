import pkg from "jsonwebtoken";
const { verify } = pkg;
const SECRET = "CCA";

const validateToken = (token) => {
  try {
    const decoded = verify(token, SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Authorization middleware
export const isAdmin = (req, res, next) => {
  const token = req?.headers?.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  const decodedToken = validateToken(token);

  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.isAdmin = decodedToken.admin.isAdmin;
  req.adminId = decodedToken.admin._id;
  if (req.isAdmin) {
    return next();
  }
  return res.status(403).json({ error: "Permission denied" });
};
