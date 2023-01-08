import { DataTypes } from "sequelize";
import { User } from "./User.js";
import db from '../db/conn.js';

export const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
});

Tought.belongsTo(User);
User.hasMany(Tought);

