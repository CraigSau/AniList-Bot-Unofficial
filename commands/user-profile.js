const anilistApi = require("../anilistAPI");
const query = require("../queries/user-profile");
const { SlashCommandBuilder, EmbedBuilder, userMention } = require("discord.js");
const striptags = require('striptags');


const data = new SlashCommandBuilder()
    .setName('user-profile')
    .setDescription('Get info about a users AniList profile')
    .addMentionableOption(option =>
        option.setName('user')
            .setDescription('Users discord @ / ID')
            .setRequired(true));


var variables = {
    search: 'Sensorless'
};


async function userAbout() {
    const obj = await anilistApi(query, variables).then((response) => response.User.about);
    return String(striptags(obj));
}

async function userMinutesWatched() {
    const obj = await anilistApi(query, variables).then((response) => response.User.statistics.anime.minutesWatched);
    return String(obj);
}

async function userChaptersRead() {
    const obj = await anilistApi(query, variables).then((response) => response.User.statistics.manga.chaptersRead);
    return String(obj);
}

let aboutString = '';
let user = userMention(data.options.user)

userAbout().then((response) => aboutString += response);
// userMinutesWatched().then((response) => console.log(response));
// userChaptersRead().then((response) => console.log(response));


module.exports = {
    data: data,
    async execute(interaction) {
        // TODO get the name that is @ed in the command to be in the response as well.
        //PROBLEMS
        // What does mentionableOption return?
        // ---- Is it user ID? user nickname? something else all together?
        // Need to pull the id (if it is an id) from the name of the mentionable option
        // and @ them in the response message from the bot
        let userInput = interaction.options.getUser('user');

        await interaction.reply({ content: `${aboutString} + '-' + ${userInput}` });
    },
};

