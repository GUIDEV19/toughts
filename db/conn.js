import { Sequelize } from "sequelize";
require('dotenv').config()

const sequelize = new Sequelize('meuspr86_toughts', process.env.USER, process.env.SENHA, {
    host: process.env.HOST,
    port: 3306,
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log('conectado ao banco de dados.');
} catch (e){
    console.log('erro ao conectar com DB' + e);
}

export default sequelize;

