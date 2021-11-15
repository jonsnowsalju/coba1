module.exports = checkrank = (client) =>
{
import fetch from "node-fetch";
import config from "./config.js";
globalThis.fetch = fetch;

import Discord from "discord-user-bots";
const client = new Discord.Client(config.token);
import cron from "cron";

client.on.ready = function () {
	let channels = config.botChannel
	if(channels.length == 0) return;
	
	console.log("Client online! Created by t.me/snowfluke");

	try {
	// How to read the cron asterisk notation: https://crontab.guru/

		let checkLvl = new cron.CronJob(
			"*/10 * * * *",
			async () => {

				
					let randomTimer = Math.floor(Math.random() * 3000) +  10000;
					setTimeout(() => {
						client.send('!rank', channels);
						index++;
					}, randomTimer);
				
			},
			null,
			true,
			config.timezone
		);
	
	} catch (error) {
		console.log(error.message);
	}
};
};