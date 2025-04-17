import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'university_database.sqlite',
    logging: false
});

export default sequelize;