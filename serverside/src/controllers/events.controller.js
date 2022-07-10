import express from 'express'
import s_events from '../services/events.service.js'
import { eventCreateSchema, eventUpdateSchema } from '../services/events.service.js'

const c_events = express.Router()

c_events.post('/', eventCreateSchema, async (req, res) => {
    try {

        const result = await s_events.add(req.body);

        console.log('result ' + JSON.stringify(result));
        res.json({ status: 'SUCCESS', result: result });
    }
    catch (ex) {
        console.log('ex ' + ex);
        res.json({ status: 'ERROR', ex: ex });
    }
})

c_events.get('/', async (req, res) => {

    try {

        console.log('req.query ' + JSON.stringify(req.query));

        if (req.query.Search) {
            const ev = await s_events.searchByName(req.query.Name, req.query.LastId);
            res.json({ status: 'SUCCESS', result: ev });

        } else {
            const ev = await s_events.get({ Id: req.body.Id });
            res.json({ status: 'SUCCESS', result: ev });
        }
    }
    catch (ex) {
        res.json({ status: 'ERROR', ex: ex });
    }
})
c_events.delete('/', async (req, res) => {
    try {
        const ev = await s_events.delete(req.query);
        if (ev)
            res.json({ status: 'SUCCESS' });
        else
            res.json({ status: 'WARNING', message: 'Affected event no longer exist.' });
    }
    catch (ex) {
        res.json({ status: 'ERROR', code: ex.code, message: ex.sqlMessage });
    }
})
c_events.patch('/', async (req, res) => {
    if (!req.body.Id)
        res.json({ status: 'ERROR', message: 'Path require Id parameter.' });
    try {
        const ev = await s_events.update(req.body);
        if (ev.affectedRows > 0)
            res.json({ status: 'SUCCESS' });
        else
            res.json({ status: 'WARNING', message: 'Affected event doesn`t exist.' });
    }
    catch (ex) {
        res.json({ status: 'ERROR', code: ex.code, message: ex.sqlMessage });
    }
})
export default c_events;