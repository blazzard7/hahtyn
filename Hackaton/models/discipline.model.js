import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Discipline = sequelize.define('Discipline', {
    discipline_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'disciplines',
    timestamps: false
});

export { Discipline };