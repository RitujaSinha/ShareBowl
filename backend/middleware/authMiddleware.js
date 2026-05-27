import jwt from "jsonwebtoken";

export const protect = (req,res,next) => {
  try {

    // Get token from cookies
    const token =
      req.cookies?.token;
    // console.log(token)
    // No token
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Not authorized",

      });
    }

    // Verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    // Save user data in req.user
    req.user = {userId: decoded.userId, role: decoded.role,};

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({

      success: false,
      message: "Invalid token",

    });
  }
};