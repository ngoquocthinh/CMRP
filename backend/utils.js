export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  const userData = {
    _id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    avatar: user.avatar,
    course_Ids: user.course_Ids,
    review_Ids: user.review_Ids,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, message, data: userData });
};
