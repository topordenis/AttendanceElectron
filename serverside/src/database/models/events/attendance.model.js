import { DataTypes, Sequelize } from 'sequelize'


export default function AttendanceModel(sequelize) {
    const attributes = {
        Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true }
    };

    const options = {

        updatedAt: false,
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: [] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        },
        freezeTableName: true
    };

    return sequelize.define('Attendances', attributes, options);
}