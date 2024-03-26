const { Events } = require("discord.js")
const { MongoClient } = require('mongodb');
const ids = require('../data/ids.js');
const idList = require('../data/idList.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		try {
            if (message.author.bot) {
                //nothing should happen
            } else {                                                                                                //Level system
                const data = new MongoClient(ids.MONGO_DB_URL_lvl);
                await data.connect();
                const db = data.db(ids.DB_NAME_lvl);
                const collection = db.collection(ids.COLLECT_NAME_lvl);

                if ( (await collection.findOne({memberid: message.author.id})) === null ) {
                    await collection.insertOne({memberid: message.author.id, xp: 5, level: 0} );
                } else {
                    await collection.updateOne({ memberid: message.author.id }, {$inc: { xp: 5 }});
                    const details = await collection.findOne({ memberid: message.author.id });
                    if (details.level < 5 && details.xp === 100) {
                        await collection.updateOne({ memberid: message.author.id }, { $inc: { level: 1 }} );
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 5) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlFive);
                            const roleheading = server.roles.cache.find((r) => r.id === idList.discLevels);
                            await member.roles.add(roleheading);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 4 && details.level < 10 && details.xp === 200 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 } });
                        await collection.updateOne( { memberid: message.author.id }, { $set: { xp: 0 } } );
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 10) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlTen);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 9 && details.level < 15 && details.xp === 300 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 } });
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 15) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlFifteen);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 14 && details.level < 20 && details.xp === 400 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 } });
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 20) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlTwenty);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 19 && details.level < 30 && details.xp === 500 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 } } );
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 30) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlThirty);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 29 && details.level < 40 && details.xp === 600 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 }});
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 40) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find( (member) => member.id === message.author.id );
                            const role = server.roles.cache.find((r) => r.id === idList.lvlForty);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 39 && details.level < 50 && details.xp === 700 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 }});
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 50) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlFifty);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 49 && details.level < 60 && details.xp === 800 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 } } );
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 60) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find( (member) => member.id === message.author.id );
                            const role = server.roles.cache.find((r) => r.id === idList.idList.lvlSixty);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 59 && details.level < 80 && details.xp === 900 ) {
                        await collection.updateOne( { memberid: message.author.id }, { $inc: { level: 1 } });
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 80) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find((member) => member.id === message.author.id);
                            const role = server.roles.cache.find((r) => r.id === idList.lvlEighty);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    } else if ( details.level > 79 && details.xp === 1000 ) {
                        await collection.updateOne(
                            { memberid: message.author.id },
                            { $inc: { level: 1 } }
                        );
                        await collection.updateOne({ memberid: message.author.id }, { $set: { xp: 0 } });
                        const updatedDetails = await collection.findOne({ memberid: message.author.id });
                        if (updatedDetails.level === 100) {
                            const server = await message.client.guilds.fetch(message.guild.id);
                            const member = server.members.cache.find( (member) => member.id === message.author.id );
                            const role = server.roles.cache.find((r) => r.id === idList.lvlHundred);
                            await member.roles.add(role);
                        }
                        const chan = message.client.channels.cache.find((ch) => ch.id === idList.levelChannel);
                        await chan.send({
                            content: `Congratulations <@${message.author.id}>, you just advanced to level ${updatedDetails.level}`,
                        });
                    }
                    //data.close ????
                }
                data.close();
            }
            if ( message.channel.id === idList.suggestionChannel ) {
                if (message.author.id != ids.CLIENT_ID) { // !=
                    const mes = await message.channel.messages.fetch({ limit: 10 });
                    mes.forEach((msg) => {
                        if (msg.author.id === ids.CLIENT_ID) msg.delete();
                    });
                    await message.channel.send({
                        content: "**Suggestions**\nTo make a suggestion copy the template below and fill it in.\n\neg.\nSuggestion: Make more server events.\nMotivation: I want more interaction within the community",
                    });
                }
            }else if (message.channel.id === idList.introductionsChannel) {                           
                if (message.author.id !== ids.CLIENT_ID) {
                    const mes = await message.channel.messages.fetch({ limit: 10 });
                    mes.forEach((msg) => {
                        if (msg.author.id === ids.CLIENT_ID) msg.delete();
                    });
                    await message.channel.send({
                        content: "Name/Nickname: [Your name or preferred nickname]\nGaming Preferences: [Favourite games or genres]\nAbout Me: [A few lines about yourself, hobbies, or interests]\nWhy I'm Here: [What you're looking forward to in the community]\nFun Fact: [An interesting titbit about yourself]\nAnything Else: [Optional - additional info you'd like to share]",
                    });
                }
            } else if ( message.channel.id === idList.artChannel || message.channel.id === idList.fanArtChannel ) {               
                await message.react("🌟");
            } else if (message.channel.id === idList.memeChannel) {                                                    
                await message.react("👍").then(message.react("👎"));
            } else if (message.channel.id === idList.VerifiedChannel) {                                                 
                await message.react(idList.verifiedReaction);
            } else if ( message.channel.id === idList.rolesChannel ) { 
                if ( message.embeds.length >= 0 ) {
                    let embed = message.embeds
                    for(let i = 0; i < embed.length; i++) {
                        if(embed[i].description.includes(idList.heReaction)) {
                            await message.react(idList.heReaction)
                            .then(await message.react(idList.sheReaction))
                            .then(await message.react(idList.theyReaction));
                        }
                        if(embed[i].description.includes(idList.genderMaleReaction)) {
                            await message.react(idList.genderMaleReaction)
                            .then(await message.react(idList.genderFemaleReaction))
                            .then(await message.react(idList.genderOtherReaction));
                        }
                        if(embed[i].description.includes(idList.introvertReaction)) {
                            await message.react(idList.introvertReaction)
                            .then(await message.react(idList.extrovertReaction))
                            .then(await message.react(idList.nighOwlReaction))
                            .then(await message.react(idList.earlyBirdReaction));
                        }
                        if(embed[i].description.includes(idList.gamerReaction)) {
                            await message.react(idList.gamerReaction)
                            .then(await message.react(idList.movieBuffReaction))
                            .then(await message.react(idList.artistReaction))
                            .then(await message.react(idList.weebReaction))
                            .then(await message.react(idList.bookWormReaction))
                            .then(await message.react(idList.techGuruReaction))
                            .then(await message.react(idList.foodieReaction));
                        }
                        if(embed[i].description.includes(idList.africaReaction)) {
                            await message.react(idList.africaReaction)
                            .then(await message.react(idList.europeReaction))
                            .then(await message.react(idList.northAmericaReaction))
                            .then(await message.react(idList.southAmericaReaction))
                            .then(await message.react(idList.asiaReaction))
                            .then(await message.react(idList.australiaReaction));
                        }
                        if(embed[i].description.includes(idList.announcementReaction)) {
                            await message.react(idList.announcementReaction)
                            .then(await message.react(idList.liveReaction))
                            .then(await message.react(idList.eventReaction))
                            .then(await message.react(idList.socialReaction));
                        }
                    }
                }
            }
		
		} catch (err) {
			console.error(err);
		}
	},
};