const { response } = require("express");
const anilistApi = require("../anilistAPI");
const query = require("../queries/user-profile");
const { SlashCommandBuilder, EmbedBuilder, userMention } = require("discord.js");
const striptags = require('striptags');


const data = new SlashCommandBuilder()
    .setName('user-profile')
    .setDescription('Get info about a users AniList profile')
    .addUserOption(option =>
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

async function userDaysWatched() {
    const obj = await anilistApi(query, variables).then((response) => response.User.statistics.anime.minutesWatched);
    const days = obj / 1440;
    return String(days);
}

async function userChaptersRead() {
    const obj = await anilistApi(query, variables).then((response) => response.User.statistics.manga.chaptersRead);
    return String(obj);
}

async function userProfilePic() {
    const obj = await anilistApi(query, variables).then((response) => response.User.avatar.large);
    return obj;
}

let aboutString = '';
let profilePic = '';
let daysWatched = '';
let chaptersRead = '';

userAbout().then((response) => aboutString += response);
userDaysWatched().then((response) => daysWatched += response);
userChaptersRead().then((response) => chaptersRead += response);
userProfilePic().then((response) => profilePic += response);

const userEmbed = new EmbedBuilder()
    .setTitle(`${data.user}'s Anilist`)
    //change the user to not hardcoded
    .setURL(`https://anilist.co/user/Sensorless/`)
    .setThumbnail(profilePic)
    .addFields(
        { name: 'About', value: `${aboutString}` },
        { name: 'Days Watched', value: `${daysWatched}` },
        { name: 'Chapters Read', value: `${chaptersRead}` }
    )

module.exports = {
    data: data,
    async execute(interaction) {
        let userInput = interaction.options.getUser('user');
        await interaction.reply({ content: userEmbed });
    },
};

