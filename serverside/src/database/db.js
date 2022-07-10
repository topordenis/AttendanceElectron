import tedious from 'tedious'
import { Sequelize } from 'sequelize';
import EventModel from './models/events/event.model.js'
import ContactModel from './models/events/contact.model.js';
import AttendanceModel from './models/events/attendance.model.js';
var dbConfig = {};
dbConfig.userName = 'DB_A67497_ABACA360_admin';
dbConfig.password = 'ttt888555rrt35';
dbConfig.server = 'SQL5081.site4now.net';
dbConfig.database = 'DB_A67497_ABACA360';

var db = {};
export default db;
initialize();


async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig;

    // connect to db
    const sequelize = new Sequelize(dbConfig.database, dbConfig.userName, dbConfig.password, { host, dialect });

    // init models and add them to the exported db object
    db.Events = EventModel(sequelize);
    db.Contacts = ContactModel(sequelize);
    db.Attendances = AttendanceModel(sequelize);
   

    db.Events.hasMany(db.Attendances);
    db.Attendances.belongsTo(db.Events);


    db.Contacts.hasMany(db.Attendances);
    db.Attendances.belongsTo(db.Contacts);

    //await sequelize.sync({ alter: true, force: true });
}



