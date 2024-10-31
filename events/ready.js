// When the bot is run. it will set the bot's status and activiates the daily birthday checker - checks the database and grants the relevant users the birthday role and sends a congratulatory messege

const { Events, ActivityType, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');
const ids = require('../data/ids.js');
const idList = require('../data/idList.js');
const { MongoClient } = require('mongodb');

module.exports = {
	name: Events.ClientReady,
	//once: true,
	execute(client) {
		try {
			console.log(`Ready! Logged in as ${client.user.tag}`);
			client.user.setPresence({
				activities: [{ name: ` over  ✨🎉 Bean Temple 🎉✨`, type: ActivityType.Watching },]
			});

			cron.schedule("0 10 * * *",
				async () => {
					console.log('start');
					const server = client.guilds.cache.get(ids.GUILD_ID);
					const role = await server.roles.fetch(idList.birthdayRole);
					let options = { timeZone: "Africa/Harare" };
			
					let date = new Date();
					let saTime = date.toLocaleString("af-ZA", options); //2023-12-10 14:57:44
					let saYear = parseInt(saTime.substring(0, 4));
					let saMonth = saTime.substring(5, 7);
					let saDay = saTime.substring(8, 10);
			
					var yesterday = new Date();
					yesterday.setDate(date.getDate() - 1 );
					let oldSaTime = yesterday.toLocaleString("af-ZA", options);
					let oldSaMonth = oldSaTime.substring(5, 7);
					let oldSaDay = oldSaTime.substring(8, 10);

					const data = new MongoClient(ids.MONGO_DB_URL_BIRTHDAYS);
					await data.connect();
					const db = data.db(ids.DB_NAME_BIRTHDAYS);
					const collection = db.collection(ids.COLLECT_NAME_BIRTHDAYS);

					const bornYesterday = await collection .find({ birthmonth: parseInt(oldSaMonth), birthdate: parseInt(oldSaDay) }).toArray();
					const bornToday = await collection .find({ birthmonth: parseInt(saMonth), birthdate: parseInt(saDay) }).toArray();

					for (var z = 0; z < bornYesterday.length; z++) {
						const member = await server.members.fetch(bornYesterday[z].memberid);
						await member.roles.remove(role);
					}

					for (let i = 0; i < bornToday.length; i++) {
						let member = await server.members.fetch(bornToday[i].memberid)
						await member.roles.add(role);
						
						let age =  saYear - await bornToday[i].birthyear;
						
						function ordinal_suffix_of(i) {
							let j = i % 10,
								k = i % 100;
							if (j === 1 && k !== 11) {
								return i + "st";
							}
							if (j === 2 && k !== 12) {
								return i + "nd";
							}
							if (j === 3 && k !== 13) {
								return i + "rd";
							}
							return i + "th";
						}
						let displayAge = ordinal_suffix_of(age);
						const chan = client.channels.cache.find((ch) => ch.id === idList.announcementsChannel);
						const birthdayEmbed = new EmbedBuilder()
						.setDescription(`🎈 Happy birthday 🎈 <@${member.user.id}>, Lets wish them a happy ${displayAge} birthday`)
						.setImage((await client.users.fetch(member.user.id)).displayAvatarURL());
						await chan.send({
							embeds: [birthdayEmbed]
						});		
					}
				}
			)
		} catch (err) {
			console.error(err);
		}
	}
};
