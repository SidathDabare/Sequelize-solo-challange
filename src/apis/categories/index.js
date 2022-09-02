/** @format */

import express from "express"
import Category from "./model.js"

const categoryRouter = express.Router()

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.send(categories)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

categoryRouter.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next(error)
  }
})

categoryRouter.post("/bulk", async (req, res, next) => {
  try {
    const categories = await Category.bulkCreate([
      { name: "electronics" },
      { name: "cloths" },
      { name: "books" },
    ])
    res.send(categories)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

categoryRouter.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next(error)
  }
})

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default categoryRouter
