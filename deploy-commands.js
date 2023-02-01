const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');
dotenv.config();
const token = process.env.DISCORD_TOKEN;
const appId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;

const guildCommands = [];
const globalCommands = [];

const commandGuildFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commandGlobalFiles = fs.readdirSync('./global-commands').filter(file => file.endsWith('.js'));

for (const file of commandGuildFiles) {
    const command = require(`./commands/${file}`);
    guildCommands.push(command.data.toJSON());
}

for (const file of commandGlobalFiles) {
    const command = require(`./global-commands/${file}`);
    globalCommands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    // TODO: Get this async call to run multiple of the routes
    // one for events and once for global events
    try {
        console.log(`Started refreshing ${guildCommands.length} guild application (/) commands.`);
        console.log(`Started refreshing ${globalCommands.length} global application (/) commands.`);
        const data = await rest.put(
            //Routes.applicationGuildCommands(appId, guildId) for personal server
            //Routes.applicationCommans(appId), { body: commands } for any server with bot in it

            //Routes.applicationCommands(appId), { body: globalCommands },
            Routes.applicationGuildCommands(appId, guildId), { body: guildCommands },

        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();