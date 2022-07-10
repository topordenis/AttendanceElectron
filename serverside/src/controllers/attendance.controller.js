import express from 'express'
import s_attendance from '../services/attendance.service.js'
import s_contacts from '../services/contacts.service.js';
const c_attendance = express.Router()

c_attendance.post('/', async (req, res) => {
    try {

        const { Barcode, EventId } = req.body;
        console.log('Barcode ' + Barcode + " EventId " + EventId);
        const Contact = await s_contacts.get({
            where: {
                Barcode: Barcode
            }
        });

        if (!Contact)
            return res.json({ status: 'ERROR', message: "Couldn't find contact by Barcode." });

        var attendance = await s_attendance.get({ where: { EventId: EventId, ContactId: Contact.Id } });

        if (attendance !== null)
            return res.json({ status: 'ERROR', message: 'Member is already registered to this event.' });


        var result = await s_attendance.add({ EventId: EventId, ContactId: Contact.Id });

        res.json({ status: 'SUCCESS', result: { "Id": result.Id, "EventId": result.EventId, "ContactId": result.ContactId, "createdAt": result.createdAt, Contact: Contact } });
    }
    catch (ex) {
        res.json({ status: 'ERROR', message: ex });
    }
})

c_attendance.get('/', async (req, res) => {

    try {

        console.log('req.query ' + JSON.stringify(req.query));

        if (req.query.Search) {
            const ev = await s_attendance.searchByName(req.query.Name, req.query.EventId, req.query.LastId);
            res.json({ status: 'SUCCESS', result: ev });

        } else {
            console.log('mata');
            const ev = await s_attendance.get({ Id: req.query.Id });
            res.json({ status: 'SUCCESS', result: ev[0] });
        }
    }
    catch (ex) {
        res.json({ status: 'ERROR', ex: JSON.stringify(ex) });
    }
})
c_attendance.delete('/', async (req, res) => {
    try {
        const ev = await s_attendance.delete({ Id: req.query.Id });
        if (ev.affectedRows > 0)
            res.json({ status: 'SUCCESS' });
        else
            res.json({ status: 'WARNING', message: 'Affected contact no longer exist.' });
    }
    catch (ex) {
        res.json({ status: 'ERROR', code: ex.code, message: ex.sqlMessage });
    }
})
c_attendance.patch('/', async (req, res) => {
    if (!req.body.Id)
        res.json({ status: 'ERROR', message: 'Path require Id parameter.' });
    try {
        const ev = await s_attendance.update(req.body);
        if (ev.affectedRows > 0)
            res.json({ status: 'SUCCESS' });
        else
            res.json({ status: 'WARNING', message: 'Affected event doesn`t exist.' });
    }
    catch (ex) {
        res.json({ status: 'ERROR', code: ex.code, message: ex.sqlMessage });
    }
})
export default c_attendance;