import { Sequelize } from "sequelize";

const sequelize = new Sequelize('toughts', 'guilherme', 'admin', {
    host: 'localhost',
    port: 4915,
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log('conectado ao banco de dados.');
} catch (e){
    console.log('erro ao conectar com DB' + e);
}

export default sequelize;

