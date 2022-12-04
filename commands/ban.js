const { SlashCommandBuilder, PermissionFlagsBits, Options } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Select a member and ban them.')
    .addUserOption(option =>
        option.setName('target').setDescription('The member to ban').setRequired(true))
    .addUserOption(option =>
        option.setName('reason').setDescription('The reason for banning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false);