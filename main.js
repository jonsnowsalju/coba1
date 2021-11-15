import fetch from "node-fetch";
import config from "./config.js";
globalThis.fetch = fetch;

import Discord from "discord-user-bots";
const client = new Discord.Client(config.token);
import cron from "cron";
import shill from "./words.js"
import ghost from "./ghost.js"

const rng = (arr) => {
	for (var i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};

let shillWords = rng(shill);
let index = 0;
let maxIndex = shillWords.length;

client.on.ready = function () {
	let channels = config.channelId
	console.log("Client online! Created by t.me/snowfluke");

	try {
		ghost(client);
	// How to read the cron asterisk notation: https://crontab.guru/
		let q0 = new cron.CronJob(
			"*/2 * * * *",
			async () => {

				if (index >= maxIndex) {
					index = 0;
					shillWords = rng(shillWords);
				}

				for(let id = 0; id < channels.length; id++){
					let randomTimer = Math.floor(Math.random() * 3000) + (id * 2000);
					setTimeout(() => {
						try{
							let msg = shillWords[index]
								.replace(/\[ProjectName]/g, config.projectName)
								.replace(/\[TokenSymbol]/g, config.tokenSymbol);
							client.send(msg, channels[id]);
							console.log(`=== Channel ${id+1} ===`)
							console.log(msg)
							index++;
						} catch(er){
							console.log(er)
						}
					}, randomTimer);
				}
			},
			null,
			true,
			config.timezone
		);
	
	} catch (error) {
		console.log(error.message);
	}
};
