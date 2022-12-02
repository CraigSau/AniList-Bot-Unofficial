const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('weeb-level').setDescription('Gives a weeb level!'),
    async execute(interaction) {
        await interaction.reply('You honestly make me sick...');
    }
};