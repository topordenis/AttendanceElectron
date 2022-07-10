import db from '../database/db.js'
import { Sequelize } from 'sequelize';
import Joi from 'joi';
import validateRequest from '../middleware/validate-request.js'

export function eventCreateSchema(req, res, next) {
    const schema = Joi.object({
        Title: Joi.string().required(),
        Event_Category: Joi.string().required(),
        ABACAEvent: Joi.string().required(),
        FromDay: Joi.string().required(),
        ToDay: Joi.string().required(),
        Month: Joi.string().required(),
        Year: Joi.string().required(),
        SheduleTime: Joi.string().required(),
        Organizer: Joi.string().required(),
        Venue: Joi.string().required(),
        Fee: Joi.string().required(),
        Banner: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

export function eventUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Title: Joi.string().required(),
        Event_Category: Joi.string().required(),
        ABACAEvent: Joi.string().required(),
        FromDay: Joi.string().required(),
        ToDay: Joi.string().required(),
        Month: Joi.string().required(),
        Year: Joi.string().required(),
        SheduleTime: Joi.string().required(),
        Organizer: Joi.string().required(),
        Venue: Joi.string().required(),
        Fee: Joi.string().required(),
        Banner: Joi.string().required()
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

const s_events = {
    get: (ev, limit) => {
        // return new Promise(async (resolve, reject) => {
        //     db.query('SELECT * FROM Events WHERE?', [ev], (error, elements) => {
        //         if (error) {
        //             return reject(error);
        //         }
        //         return resolve(elements);
        //     });
        // });
        return db.Event.findAll();
    },
    searchByName: async (Name, LastId) => {

        const params = {
            where: {
                Title: {
                    [Sequelize.Op.like]: `%${Name}%`
                },
                Id: { [Sequelize.Op.lt]: LastId == -1 ? Number.MAX_SAFE_INTEGER : LastId }
            },
            order: [["Id", "Desc"]],
            limit: 5,
        };

        return await db.Events.findAll(params);
    },
    add: async (params) => {

        const ev = new db.Events(params);
        var res = await ev.save();

        console.log('res ' + JSON.stringify(res));

        return res;
    },
    delete: async (ev) => {
        return await db.Events.destroy({ where: ev });
    },
    update: async (params) => {
        return await db.Events.update(params, { where: { Id: params.Id } });
    }
}

export default s_events;
