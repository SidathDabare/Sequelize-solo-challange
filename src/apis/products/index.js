/** @format */

import express, { query } from "express"
import { Op } from "sequelize"
import Product from "./model.js"
import Category from "../categories/model.js"
import ProductCategory from "./productCtegory.js"
import Users from "../users/model.js"
import Review from "../reviews/model.js"

const productRouter = express.Router()

productRouter.get("/", async (req, res, next) => {
  try {
    // const products = await Product.findAll({
    //   attributes: ["name", "category", "price", "description", "image", "id"],
    //   where: query,
    // })

    const products = await Product.findAll({
      include: [
        Users,
        {
          model: Category,
          attributes: ["name", "id"],
          through: { attributes: [] },
        },
        Review,
      ],
    })
    res.send(products)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.post("/", async (req, res, next) => {
  try {
    // const newProduct = await Product.create({
    //   name: req.body.name,
    //   category: req.body.category,
    //   description: req.body.description,
    //   image: req.body.image,
    //   price: req.body.price,
    //   userId: req.body.userId,
    // })

    // if (newProduct.id) {
    //   const dataToInsert = req.body.categories.map((categoryId) => ({
    //     categoryId: categoryId,
    //     productId: newProduct.id,
    //   }))

    // await ProductCategory.bulkCreate(dataToInsert)
    const product = await Product.create(req.body)
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
productRouter.delete("/:id", async (req, res, next) => {
  try {
    const result = await Product.destroy({
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
productRouter.post("/:productId/add/:categoryId", async (req, res, next) => {
  try {
    const result = await ProductCategory.create({
      productId: req.params.productId,
      categoryId: req.params.categoryId,
    })

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productRouter.delete(
  "/:productId/delete/:categoryId",
  async (req, res, next) => {
    try {
      const result = await ProductCategory.destroy({
        where: {
          categoryId: req.params.categoryId,
          productId: req.params.productId,
        },
      })
      res.send({ rows: result })
    } catch (error) {
      console.log(error)
    }
  }
)

export default productRouter
