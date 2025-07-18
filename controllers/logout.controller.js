import User from "../models/user.js";

const logOutUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(200).json({
        success: true,
        message: "User has been successfully logged out",
      });
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });

    if (!user) {
        res.clearCookie('jwt',{
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production'
        })
      return res.status(200).json({
        success: true,
        message: "User has been successfully logged out",
      });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      message: "User has been successfully logged out",
    });
  } catch (err) {
    if (!err.status) {
        err.status = 500;
    }
    next(err);
  }
};

export default logOutUser;
