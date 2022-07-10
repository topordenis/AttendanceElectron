import { DataTypes } from 'sequelize'


export default function ContactModel(sequelize) {
    const attributes = {
        Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        Name: { type: DataTypes.STRING, allowNull: false },
        Phone: { type: DataTypes.STRING, allowNull: false },
        Location: { type: DataTypes.STRING, allowNull: false },
        Role: { type: DataTypes.STRING, allowNull: false },
        Age: { type: DataTypes.STRING, allowNull: false },
        Barcode: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define('Contacts', attributes, options);
}