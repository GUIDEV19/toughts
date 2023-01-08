import { Sequelize } from "sequelize";

const sequelize = new Sequelize('meuspr86_toughts', 'meuspr86_guilherme', "7L}MzNu;K(j{", {
    host: 'br946.hostgator.com.br',
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

