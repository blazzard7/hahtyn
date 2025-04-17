import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Classroom = sequelize.define('Classroom', {
    classroom_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    classroomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 0
        }
    },
    
}, {
    tableName: 'classrooms',
    timestamps: false
});

export {Classroom};