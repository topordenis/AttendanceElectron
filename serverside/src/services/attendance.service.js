import db from '../database/db.js'
import { Sequelize } from 'sequelize';
import Joi from 'joi';
import validateRequest from '../middleware/validate-request.js'
import s_contacts from './contacts.service.js';
import ContactModel from '../database/models/events/contact.model.js';
export function attendanceCreateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.string().required(),
        Location: Joi.string().required(),
        Role: Joi.string().required(),
        Age: Joi.number().required()
    });
    validateRequest(req, next, schema);
}
export function attendanceUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.string().required(),
        Location: Joi.string().required(),
        Role: Joi.string().required(),
        Age: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

const s_attendances = {
    get: async (where) => {
        return await db.Attendances.findOne(where);
    },
    searchByName: async (Name, EventId, LastId) => {
        console.log('search for eventid ' + EventId);
        const params = {
            include: {
                model: db.Contacts,
                where: {
                    Name: { [Sequelize.Op.like]: `%${Name}%` }
                }
            },

            
            where: {
                EventId: EventId,
                Id: { [Sequelize.Op.lt]: LastId == -1 ? Number.MAX_SAFE_INTEGER : LastId }
            },
            order: [["Id", "Desc"]],
            limit: 10,
        }
        return await db.Attendances.findAll(params);
    },
    add: async (params) => {


        const ev = new db.Attendances(params);


        var res = await ev.save();
        return res;
    },
    delete: async (ev) => {
        return await db.Attendances.destroy({ where: ev });
    },
    update: async (params) => {
        return await db.Attendances.update(params, { where: { Id: params.Id } });
    }
}

export default s_attendances;
