const { SlashCommandBuilder } = require('discord.js');
const requestdata = require('../requestdata.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('elo')
		.setDescription('Returns 1v1 and 2v2 elo of user!')
        .addStringOption(option => option.setName('user').setDescription('WB Username').setRequired(true)),
	async execute(interaction) {
        user = interaction.options.getString('user');
        searchlength = (await mvs_client.profiles.search(user)).results.length;
        string = "";
        if (searchlength == 1) {
            const user_id = await (await mvs_client.profiles.search(user)).results[0].result.account_id;
            const score1v1 = await requestdata.requestData("/leaderboards/1v1/score-and-rank/" + user_id, mvs_client.accessToken);
            const score2v2 = await requestdata.requestData("/leaderboards/2v2/score-and-rank/" + user_id, mvs_client.accessToken);
            console.log(score1v1.score)
            console.log(score2v2.score)
            console.log("1v1: " + score1v1.score + " 2v2: " + score2v2.score)
            string = string.concat("1v1: " + score1v1.score + " 2v2: " + score2v2.score);
        }
        return interaction.reply(string);
	},
};