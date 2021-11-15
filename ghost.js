import fetch from "node-fetch";
import config from "./config.js";
globalThis.fetch = fetch;

import Discord from "discord-user-bots";
const client = new Discord.Client(config.token);
import cron from "cron";

module.exports = ghost = (client) =>{
	let invite = new cron.CronJob(
		"*/1 * * * *",
			async () => {
				let randomTimer = Math.floor(Math.random() * 5000) +  1000;
				setTimeout(() => {
					client.send('!rank', config.botChannel).then((msg) => setTimeout(() => {
						client.delete_message(msg.id, config.botChannel);}, 100)
					};
				}, randomTimer);
			},
			null,
			true,
			config.timezone
	};
};
