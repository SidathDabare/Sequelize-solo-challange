/** @format */

import express, { query } from "express"

import sequelize from "../../db/index.js"
import { Op } from "sequelize"
import Review from "./model.js"
import User from "../users/model.js"
import Product from "../products/model.js"

const reviewRouter = express.Router()

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [User, Product],
    })

    res.send(reviews)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id)
    res.send(review)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

reviewRouter.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body)

    res.send(review)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const review = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(review)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Review.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.send({ rows: result })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default reviewRouter
