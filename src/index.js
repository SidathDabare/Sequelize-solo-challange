/** @format */

import express from "express"
import { authenticateDB, syncModels } from "./db/index.js"
import cors from "cors"
import productRouter from "./apis/products/index.js"
import userRouter from "./apis/users/index.js"
import categoryRouter from "./apis/categories/index.js"
import reviewRouter from "./apis/reviews/index.js"
import Product from "./apis/products/model.js"
import User from "./apis/users/model.js"
import Category from "./apis/categories/model.js"
import ProductCategory from "./apis/products/productCtegory.js"
import Review from "./apis/reviews/model.js"

User.hasMany(Product)
Product.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Product.belongsToMany(Category, { through: ProductCategory })
Category.belongsToMany(Product, { through: ProductCategory })

const server = express()

server.use(express.json())

server.use(cors())
server.use("/products", productRouter)
server.use("/users", userRouter)
server.use("/categories", categoryRouter)
server.use("/reviews", reviewRouter)

const { PORT = 5001 } = process.env

const initalize = async () => {
  try {
    server.listen(PORT, async () => {
      console.log("✅ Server is listening on port " + PORT)
    })

    server.on("error", (error) => {
      console.log("❌ Server is not running due to error : " + error)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

authenticateDB()
  .then(async () => {
    await syncModels()
  })
  .then(() => {
    initalize()
  })
  .catch((e) => console.log(e))
