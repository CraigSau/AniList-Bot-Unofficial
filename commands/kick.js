const { SlashCommandBuilder, PermissionFlagsBits, Options } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them.')
    .addUserOption(option =>
        option.setName('target').setDescription('The member to kick').setRequired(true))
    .addUserOption(option =>
        option.setName('reason').setDescription('The reason for kicking').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers)
    .setDMPermission(false);