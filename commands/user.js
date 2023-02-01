const res = require("express/lib/response");
const anilistApi = require("../anilistAPI");
const query = require("../queries/user");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const striptags = require('striptags');


// PROBLEMS
//-------------------
//How do we run a graphql query through a discord slash command | Get data from graphql API
//How to use axios to do this

//How do we handle the json object that comes back from the query
//potentially how do we parse the json object for values we can plug into discord message

//How do we display that data in a discord message in a user friendly manner
//how to create a custom discord message response that takes in data from api response



const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Get info about a users AniList profile');


var variables = {
    search: 'Sensorless'
};


async function userAbout() {
    const obj = await anilistApi(query, variables).then((response) => response.User.about);
    console.log(striptags(obj));
    return String(striptags(obj));
}

async function userMinutesWatched() {
    const obj = await anilistApi(query, variables).then((response) => response.User.statistics.anime.minutesWatched);
    console.log(obj);
    return String(obj);
}

var aboutString = '';

userAbout().then((response) => aboutString = response);
userMinutesWatched().then((response) => console.log(response));


module.exports = {
    data: data,
    async execute(interaction) {
        await interaction.reply({ content: aboutString });
    },
};

