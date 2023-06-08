//let ENV = process.env

// GOALS
// Get redirect from button on the website to successfully pass oauth tokens
// Get the oauth flow to happen successfully from a discord bot command

//AniList Example

// var url = 'https://graphql.anilist.co',
//     options = {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Bearer ' + accessoken,
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//             query: query
//         })
//     };

// fetch(url, options).then(handleResponse);

// function handleResponse(response) {
//     console.log(response);
// }

//Personal Attempt

// var url = 'https://anilist.co/api/v2/oauth/authorize?client_id={YOUR CLIENT ID HERE WITHOUT BRACKETS}&response_type=token';

window.onload = () => {
    //var clientId = process.env.ANILIST_API_CLIENT_ID;
    var clientId = 11048
    var setUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=token`;
    document.getElementById("oauth-but").setAttribute("href", setUrl);
}

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query
        })
    };

fetch(url, options).then(handleResponse, handleError);

function handleResponse(response) {
    console.log(response);
}