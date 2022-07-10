import db from '../database/db.js'
import { Sequelize } from 'sequelize';
import Joi from 'joi';
import validateRequest from '../middleware/validate-request.js'

export function contactCreateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.string().required(),
        Location: Joi.string().required(),
        Role: Joi.string().required(),
        Barcode: Joi.string().required(),
        Age: Joi.number().required()
    });
    validateRequest(req, next, schema);
}
export function contactUpdateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.string().required(),
        Location: Joi.string().required(),
        Role: Joi.string().required(),
        Barcode: Joi.string().required(),
        Age: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

const s_contacts = {
    get: async (where) => {
        return await db.Contacts.findOne(where);
    },
    searchByName: async (Name, LastId) => {

        const params = {
            where: {
                Name: {
                    [Sequelize.Op.like]: `%${Name}%`
                },
                Id: { [Sequelize.Op.lt]: LastId == -1 ? Number.MAX_SAFE_INTEGER : LastId }
            },
            order: [["Id", "Desc"]],
            limit: 10,
        };

        return await db.Contacts.findAll(params);
    },
    add: async (params) => {

        const ev = new db.Contacts(params);
        var res = await ev.save();


        return res;
    },
    delete: async (ev) => {
        return await db.Contacts.destroy({ where: ev });
    },
    update: async (params) => {
        return await db.Contacts.update(params, { where: { Id: params.Id } });
    }
}

export default s_contacts;
