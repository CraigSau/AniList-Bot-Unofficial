const anilistApi = require("../anilistAPI");
const query = require("../queries/user-profile");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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

// async function userAbout() {
//     const obj = await anilistApi(query, userId)
//         .then((response) => response.User.about)
//         .catch((err) => console.log(err));
//     return String(striptags(obj));
// }

// async function userDaysWatched() {
//     const obj = await anilistApi(query, userId)
//         .then((response) => response.User.statistics.anime.minutesWatched)
//         .catch((err) => console.log(err));
//     const days = obj / 1440;
//     return String(days);
// }

// async function userChaptersRead() {
//     const obj = await anilistApi(query, userId)
//         .then((response) => response.User.statistics.manga.chaptersRead)
//         .catch((err) => console.log(err));
//     return String(obj);
// }

// async function userProfilePic() {
//     const obj = await anilistApi(query, userId)
//         .then((response) => response.User.avatar.large)
//         .catch((err) => console.log(err));
//     return String(obj);
// }

async function getUser() {
    try {
        const obj = await anilistApi(query, variables)
    } catch (e) {
        console.log(e)
    }
    return obj.User
}

async function createEmbed() {
    const user = await getUser();
    const aboutString = striptags(user.about);
    const daysWatched = user.minutesWatched / 1440;
    daysWatched = String(daysWatched);
    const chaptersRead = user.chaptersRead;
    chaptersRead = String(chaptersRead);
    const profilePic = user.avatar.large;
    const userEmbed = new EmbedBuilder()
        .setTitle(`${data.options.User}'s Anilist`)
        //TODO - change the user to not hardcoded
        .setURL(`https://anilist.co/user/Sensorless/`)
        .setThumbnail(profilePic)
        .addFields(
            { name: 'About', value: aboutString },
            { name: 'Days Watched', value: daysWatched },
            { name: 'Chapters Read', value: chaptersRead }
        )
    return userEmbed
}


module.exports = {
    data: data,
    async execute(interaction) {
        await interaction.reply({ embeds: [await createEmbed()] });
    },
};

