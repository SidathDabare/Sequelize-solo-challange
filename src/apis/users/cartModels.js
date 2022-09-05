/** @format */

import sequelize from "../../db/index.js"
import { DataTypes } from "sequelize"

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: { type: DataTypes.STRING, enum: ["Active", "Paid"] },
  productId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quntity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
})

export default Cart
