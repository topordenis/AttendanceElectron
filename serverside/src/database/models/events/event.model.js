import { DataTypes } from 'sequelize'


export default function EventModel(sequelize) {
    const attributes = {
        Id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        Title: { type: DataTypes.STRING, allowNull: false },
        Event_Category: { type: DataTypes.STRING, allowNull: false },
        ABACAEvent: { type: DataTypes.STRING, allowNull: false },
        FromDay: { type: DataTypes.STRING, allowNull: false },
        ToDay: { type: DataTypes.STRING, allowNull: false },
        Month: { type: DataTypes.STRING, allowNull: false },
        Year: { type: DataTypes.STRING, allowNull: false },
        SheduleTime: { type: DataTypes.STRING, allowNull: false },
        Organizer: { type: DataTypes.STRING, allowNull: false },
        Venue: { type: DataTypes.STRING, allowNull: false },
        Fee: { type: DataTypes.STRING, allowNull: false },
        Banner: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define('Events', attributes, options);
}