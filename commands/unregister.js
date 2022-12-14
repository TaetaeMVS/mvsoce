const { SlashCommandBuilder } = require('discord.js');
const mvs = require('mvslib');
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('Use to unlink your Discord account and Warner Bros account from the bot'),
    async execute(interaction) {
        // Get the username from the command options
        await interaction.deferReply();
        mvs.Users.removeUserFromJSONFile(interaction.member.id);

        // Reply to the user to confirm that their username has been registered
        await interaction.editReply(`Your Discord account has been unregistered from the bot`);
    }};
