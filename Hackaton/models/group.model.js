import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Group = sequelize.define('Group', {
    group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'groups',
    timestamps: false
});

export {Group};