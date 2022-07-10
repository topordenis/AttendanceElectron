import axios from 'axios'


const s_attendance = {
    get: async (ev) => {
        return await axios.get('http://localhost:8080/api/attendance', { headers: { "Access-Control-Allow-Origin": "*" } }, ev);

    },
    add: async (ev) => {
        return await axios.post('http://localhost:8080/api/attendance', ev);
    },
    searchByName: async (name, EventId, LastId) => {

        return await axios.get('http://localhost:8080/api/attendance', { params: { Search: true, Name: name, EventId: EventId, LastId: LastId } });
    },
    delete: async (ev) => {
        return await axios.delete('http://localhost:8080/api/attendance', { params: { Id: ev.Id } });
    },
    update: async (ev) => {
        return await axios.patch('http://localhost:8080/api/attendance', ev);
    }
}

export default s_attendance;
