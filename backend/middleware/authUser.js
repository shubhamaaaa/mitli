import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decodedToken.id }; // Attach user data to req
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;