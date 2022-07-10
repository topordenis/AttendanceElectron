import axios from 'axios'


const s_events = {
    get: async (ev) => {
        return await axios.get('http://localhost:8080/api/events', { headers: { "Access-Control-Allow-Origin": "*" } }, ev);

    },
    search: async (ev) => {
        return await axios.get('http://localhost:8080/api/events', ev);
    },
    searchByName: async (name, LastId) => {

        return await axios.get('http://localhost:8080/api/events', { params: { Search: true, Name: name, LastId: LastId } });
    },
    add: async (ev) => {
        return await axios.post('http://localhost:8080/api/events', ev);
    },
    delete: async (ev) => {
        return await axios.delete('http://localhost:8080/api/events', ev);
    },
    update: async (ev) => {
        return await axios.patch('http://localhost:8080/api/events', ev);
    }
}

export default s_events;
