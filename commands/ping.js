const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')


module.exports = {
    data: data,
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};