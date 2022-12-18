

async function getAnime(animeQuery) {
    const query = `
        query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
        pageInfo {
            total
            perPage
        }
        media (search: $search, type: ANIME, sort: FAVOURITES_DESC) {
            id
            title {
                romaji
                english
                native
            }
            type
            generes
        }
    }
}`;

    let variables = {
        search: query,
        pages: 1,
        perPage: 3,
    };

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };


    fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data);
    }

    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }
}

module.exports = getAnime.fetch;

