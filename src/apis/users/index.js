/** @format */

import express, { query } from "express"
import sequelize from "../../db/index.js"
import { Op } from "sequelize"

import Product from "../products/model.js"
import User from "./model.js"
import Review from "../reviews/model.js"
import Cart from "./cartModels.js"

const userRouter = express.Router()

userRouter.get("/", async (req, res, next) => {
  try {
    if (req.query.firstName) {
      query.firstName = {
        [Op.iLike]: `%${req.query.firstName}%`,
      }
    }
    if (req.query.age) {
      query.age = {
        [Op.between]: req.query.age.split(","),
      }
    }
    if (req.query.country) {
      query.country = {
        [Op.in]: req.query.country.split(","),
      }
    }

    const users = await User.findAll({
      include: [Product, Review], // User.hasMany(Products);

      where: query,
    })

    // const result = await sequelize.query(
    //   'select id, "firstName", "lastName", "createdAt", "updatedAt" from "users"'
    // );
    res.send(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userRouter.get("/:id", async (req, res, next) => {
  try {
    // const user = await User.findAll({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    const user = await User.findByPk(req.params.id)
    res.send(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userRouter.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body)

    res.send(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userRouter.put("/:id", async (req, res, next) => {
  try {
    const users = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const users = await User.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.send({ rows: users })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
userRouter.post("/:userId/cart", async (req, res, next) => {
  try {
    // 0. We gonna receive bookId and the quantity in req.body
    const { productId, quantity } = req.body
    console.log(productId)

    // 1. Does the user exist? If not --> 404
    const user = await User.findByPk(req.params.userId)
    //console.log(user)
    if (!user) return next(`User with id ${req.params.userId} not found!`)

    // 2. Does the product exist? If not --> 404
    const purchasedProduct = await Product.findByPk(productId)
    //console.log(purchasedProduct)
    if (!purchasedProduct)
      return next(`Product with id ${productId} not found!`)

    // 3. Is the product already in the ACTIVE cart of the specified user?
    const isProductThere = await Cart.findOne({
      owner: req.params.userId,
      status: "Active",
      productId: productId,
    })
    //console.log(isProductThere)
    if (isProductThere) {
      const modifiedCart = await Cart.create(
        {
          owner: req.params.userId,
          status: "Active",
          productId: productId,
        }, // WHAT we want to modify
        { $inc: { quantity: quantity } }, // HOW we want to modify
        { new: true, runValidators: true } // OPTIONS
      )
      //console.log("if CART", modifiedCart)
      res.send(modifiedCart)
    } else {
      // 3.2 If it is not --> add it to cart (if the cart exists)
      const modifiedCart = await Cart.create(
        { owner: req.params.userId, status: "Active" }, // WHAT
        { $push: { productId: productId, quantity } } // HOW
      )
      //console.log("if NOT", modifiedCart)
      res.send({ rows: modifiedCart })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
userRouter.get("/:userId/cart", async (req, res, next) => {
  try {
    const cart = await Cart.findAll()
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

export default userRouter
