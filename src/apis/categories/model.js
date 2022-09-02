/** @format */

import sequelize from "../../db/index.js"
import { DataTypes } from "sequelize"

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

export default Category
