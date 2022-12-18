const { SlashCommandBuilder, PermissionFlagsBits, Options } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them.')
    .addUserOption(option =>
        option.setName('target').setDescription('The member to kick').setRequired(true))
    .addStringOption(option =>
        option.setName('reason').setDescription('The reason for kicking').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
    .setDMPermission(false);

module.exports = {
    data: data,
    async execute(interaction) {
        let user = interaction.options.getUser("target")
        let member = await interaction.guild.members.fetch(user.id).catch(console.error);
        let reason = interaction.options.getString("reason");

        if (!member) return interaction.reply("Invalid member");

        try {
            await interaction.guild.members.kick(member, reason);
            return interaction.reply(`${member.user.tag} has been kicked out for ${reason}`);
        } catch (error) {
            if (error) {
                console.error(error);
                return interaction.reply(`Failed to kick ${member.user.tag}`);
            }
        }
    }
}