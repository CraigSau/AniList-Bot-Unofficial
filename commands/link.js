const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('link')
    .setDescription('Links your discord account to your AniList account.')

console.log('test')



module.exports = {
    data: data,
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};
