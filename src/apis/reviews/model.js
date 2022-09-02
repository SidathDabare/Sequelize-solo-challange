/** @format */

import sequelize from "../../db/index.js"
import { DataTypes } from "sequelize"

const Review = sequelize.define("review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

export default Review
