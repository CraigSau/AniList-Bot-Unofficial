const { SlashCommandBuilder, PermissionFlagsBits, Options } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Select a member and ban them.')
    .addUserOption(option =>
        option.setName('target').setDescription('The member to ban').setRequired(true))
    .addStringOption(option =>
        option.setName('reason').setDescription('The reason for banning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false);

module.exports = {
    data: data,
    async execute(interaction) {
        let user = interaction.options.getUser("target")
        let member = await interaction.guild.members.fetch(user.id).catch(console.error);
        let reason = interaction.options.getString("reason");

        if (!memeber) return interaction.reply("Invalid member");

        try {
            await interaction.guild.bans.create(member, reason);
            return interaction.reply(`${member.user.tag} has been banned for ${reason}`);
        } catch (error) {
            if (error) {
                console.error(error);
                return interaction.reply(`Failed to ban ${member.user.tag}`);
            }
        }
    }
}