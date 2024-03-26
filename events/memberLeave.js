const { Events, EmbedBuilder } = require("discord.js")
const { MongoClient } = require('mongodb');
const ids = require("../data/ids.js");
const idList = require("../data/idList.js");

module.exports = {
    name:Events.GuildMemberRemove,
    async execute(member) {
        try {
            const memberAmmount = (await member.guild.members.fetch()).filter((c) => !c.user.bot).size;
            member.client.user.setActivity({
                name:`Watching over ` + memberAmmount + ` members in ✨🎉 Bean Temple 🎉✨`,
            });
            const data = new MongoClient(ids.MONGO_DB_URL_BIRTHDAYS);
            await data.connect();
            const db = data.db(ids.DB_NAME_BIRTHDAYS);
            const collection = db.collection(ids.COLLECT_NAME_BIRTHDAYS);
            await collection.deleteOne({ memberid: member.user.id});

            const chan = member.client.channels.cache.find((ch) => ch.id === idList.logsChannel);
            const userAvatar = await member.client.users.fetch(member.user.id);
            const userUsername = member.user.username;
            const welcomeEmbed = new EmbedBuilder()
                .setTitle( "Member Left")
                .setDescription(`<@${member.id}> (${userUsername})`)
                .setThumbnail( userAvatar.displayAvatarURL() )
                .setFooter({ text: "ID: " + member.user.id });
            await chan.send({embeds: [welcomeEmbed]});
        } catch (err) {
            console.error(err);
        }
    }
};