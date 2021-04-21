const axios = require('axios');

export default {
    get: options => {
        let path = ''
        if (options.id) {
            path = `http://localhost:4000/${options.entity}/${options.id}`
        } else {
            path = `http://localhost:4000/${options.entity}`
        }
        return axios.get(path)
            .then(response => {
                console.log(response);
                if (options.id) {
                    debugger
                    return response.data.result[0]
                }
                return response.data;
            })
            .catch(error => {
                console.error(error);
            })

    },
    create: options => {
        return axios.post(`http://localhost:4000/${options.entity}`, {recipe: options.data})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    },
    remove: options => {
        return axios.delete(`http://localhost:4000/${options.entity}/${options.id}`)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.error(error);
            })
    },
    update: options => {
        return axios.put(`http://localhost:4000/${options.entity}/${options.id}`, {recipe:options.data})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}