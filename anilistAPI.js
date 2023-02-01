const axios = require('axios');

async function queryApi(query, variables) {

    var options = {
        method: 'POST',
        url: 'https://graphql.anilist.co',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: {
            query: query,
            variables: variables
        }
    };


    return axios(options).then((response) => response.data.data).catch((err) => console.log(err));
}

module.exports = queryApi;