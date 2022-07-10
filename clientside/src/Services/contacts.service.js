import axios from 'axios'


const s_contacts = {
    get: async (ev) => {
        return await axios.get('http://localhost:8080/api/contacts', { headers: { "Access-Control-Allow-Origin": "*" } }, ev);

    },
    search: async (ev) => {
        return await axios.get('http://localhost:8080/api/contacts', ev);
    },
    searchByName: async (name, LastId) => {

        return await axios.get('http://localhost:8080/api/contacts', { params: { Search: true, Name: name, LastId: LastId } });
    },
    add: async (ev) => {
        return await axios.post('http://localhost:8080/api/contacts', ev);
    },
    delete: async (ev) => {
        return await axios.delete('http://localhost:8080/api/contacts?Id=' + ev.Id );
    },
    update: async (ev) => {
        return await axios.patch('http://localhost:8080/api/contacts', ev);
    }
}

export default s_contacts;
