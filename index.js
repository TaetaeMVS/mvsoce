
// noinspection JSUndeclaredVariable

(async () => {
	require('dotenv').config();
	const express = require('express');
	const app = express();
	const port = process.env.PORT || 3000;
	const fs = require('node:fs');
	const path = require('node:path');
	const { Client, GatewayIntentBits, Collection } = require('discord.js');
	const mvs = require("mvslib");
	const { Client: MVSClient } = require("multiversus.js");

	app.get(["/", "/:name"], (req, res) => {
		greeting = "<h1>Hello From Node on Fly!</h1>";
		name = req.params["name"];
		if (name) {
			res.send(greeting + "</br>and hello to " + name);
		} else {
			res.send(greeting);
		}
	});

	app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

	const client = new Client({ intents: [GatewayIntentBits["Guilds"]] });
	client.commands = new Collection();
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}

	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	const mvstoken = await mvs.generatemvstoken.getAccessToken();
	mvs_client = new MVSClient({ accessToken: mvstoken });
	await client.login(process.env.TOKEN);
})();
