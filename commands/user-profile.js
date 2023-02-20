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

async function getUser() {
    let obj = null
    try {
        obj = await anilistApi(query, variables)
    } catch (e) {
        console.log(e)
    }
    return obj.User
}

// async function createEmbed() {
//     const user = await getUser();
//     let aboutString = '';
//     if (user.about != null) {
//         aboutString = striptags(user.about);
//     } else {
//         aboutString = 'No about found'
//     }
//     let daysWatched = parseInt(user.statistics.anime.minutesWatched / 1440);
//     daysWatched = String(daysWatched);
//     let chaptersRead = user.statistics.manga.chaptersRead;
//     chaptersRead = String(chaptersRead);
//     const profilePic = user.avatar.large;
//     const userEmbed = new EmbedBuilder()
//         .setTitle(`${data.options.getUser('user')}'s Anilist`)
//         //TODO - change the user to not hardcoded
//         .setURL(`https://anilist.co/user/Sensorless/`)
//         .setThumbnail(profilePic)
//         .addFields(
//             { name: 'About', value: aboutString },
//             { name: 'Days Watched', value: daysWatched },
//             { name: 'Chapters Read', value: chaptersRead }
//         )
//     return userEmbed
// }


module.exports = {
    data: data,
    async execute(interaction) {
        const userName = interaction.options.getUser('user');
        async function createEmbed() {
            const user = await getUser();
            let aboutString = '';
            if (user.about != null) {
                aboutString = striptags(user.about);
            } else {
                aboutString = 'No about found'
            }
            let daysWatched = parseInt(user.statistics.anime.minutesWatched / 1440);
            daysWatched = String(daysWatched);
            let chaptersRead = user.statistics.manga.chaptersRead;
            chaptersRead = String(chaptersRead);
            const profilePic = user.avatar.large;
            const aniListName = user.name;
            const userEmbed = new EmbedBuilder()
                .setTitle(`${aniListName}'s Anilist`)
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

        await interaction.reply({ embeds: [await createEmbed()] });
        await interaction.followUp(`${userName}'s Profile`)
    },
};

