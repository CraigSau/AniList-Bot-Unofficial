const api = require("../anilistAPI");
const query = require("../queries/user");
const discordMessage = require("../discordMessage");
const striptags = require("striptags");
const axios = require("axios");
const { SlashCommandBuilder, SlashCommandStringOption } = require("discord.js");
const { request } = require("express");


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
    .setDescription('Get info about a users AniList profile')
    .add


const search = async searchArg => {
    const response = await api(query, {
        search: searchArg
    });

    if (response.error) {
        return response;
    }

    const data = response.User;
    console.log(data);
    const watchedTime = data.statistics.anime.minutesWatched;
    const chaptersRead = data.statistics.manga.chaptersRead;

    const chaptersString = chaptersRead != 0 ? `Chapters read ${chaptersRead}` : "";

    let daysWatched = "";
    if (watchedTime != 0) {
        daysWatched = (watchedTime / (60 * 24)).toFixed(1);
        daysWatched = `Days watched: ${daysWatched}`;
    }

    let footer = "";
    if (watchedTime) footer += daysWatched + "  ";
    if (chaptersRead) footer += chaptersRead;

    return discordMessage({
        name: data.name,
        url: data.siteUrl,
        imageUrl: data.avatar.large,
        description: striptags(data.about),
        footer: footer
    });
};



module.exports = {
    data: data,
    async execute(interaction) {
        await interaction.JSON.stringify(search);
    }
};