import express from 'express'
import s_contacts from '../services/contacts.service.js'
import { contactCreateSchema, contactUpdateSchema } from '../services/contacts.service.js'

const c_contacts = express.Router()

c_contacts.post('/', contactCreateSchema, async (req, res) => {
    try {

        const result = await s_contacts.add(req.body);

        console.log('result ' + JSON.stringify(result));
        res.json({ status: 'SUCCESS', result: result });
    }
    catch (ex) {
        console.log('ex ' + ex);
        res.json({ status: 'ERROR', ex: ex });
    }
})

c_contacts.get('/', async (req, res) => {

    try {

        console.log('req.query ' + JSON.stringify(req.query));

        if (req.query.Search) {
            const ev = await s_contacts.searchByName(req.query.Name, req.query.LastId);
            res.json({ status: 'SUCCESS', result: ev });

        } else {
            const ev = await s_contacts.get({ Id: req.body.Id });
            res.json({ status: 'SUCCESS', result: ev });
        }
    }
    catch (ex) {
        res.json({ status: 'ERROR', ex: ex });
    }
})
c_contacts.delete('/', async (req, res) => {
    try {
        const ev = await s_contacts.delete(req.query);
        if (ev)
            res.json({ status: 'SUCCESS' });
        else
            res.json({ status: 'WARNING', message: 'Affected event no longer exist.' });
    }
    catch (ex) {
        res.json({ status: 'ERROR', code: ex.code, message: ex.sqlMessage });
    }
})
c_contacts.patch('/', async (req, res) => {
    if (!req.body.Id)
        res.json({ status: 'ERROR', message: 'Path require Id parameter.' });
    try {
        const ev = await s_contacts.update(req.body);
        if (ev.affectedRows > 0)
            res.json({ status: 'SUCCESS' });
        else
            res.json({ status: 'WARNING', message: 'Affected event doesn`t exist.' });
    }
    catch (ex) {
        res.json({ status: 'ERROR', code: ex.code, message: ex.sqlMessage });
    }
})
export default c_contacts;