import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../middlewares.js";
import { UserModel } from "../models/user.model.js";
import ReviewModel from "../models/review.model.js";
import CourseModel from "../models/course.model.js";
import CartModel from "../models/cart.model.js";

const userRouter = express.Router();

/** GET PROFILE */
userRouter.get(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await UserModel.findById(_id);

      if (!user) {
        return res.status(404).send({ message: "Không tìm thấy user" });
      }

      const reviews = await ReviewModel.find({ user_id: _id });
      const reviewsWithCourseNames = await Promise.all(
        reviews.map(async (review) => {
          const course = await CourseModel.findById(review.course_id);
          return course ? { ...review._doc, course_name: course.name } : review;
        })
      );

      const userCart = await CartModel.find({ user_id: _id });
      const cartsWithCourseDetails = await Promise.all(
        userCart.map(async (cartItem) => {
          const course = await CourseModel.findById(cartItem.course_id);
          const author = await UserModel.findById(course.user_id);
          return course
            ? { ...cartItem._doc, course_details: course, author: author.name }
            : cartItem;
        })
      );

      return res.send({
        user,
        reviews: reviewsWithCourseNames,
        carts: cartsWithCourseDetails,
      });
    } catch (err) {
      res.status(500).send({ message: "Lỗi server" });
    }
  })
);

export default userRouter;
