const { Events, EmbedBuilder } = require("discord.js")
const idList = require('../data/idList.js');

module.exports = {
    name:Events.GuildMemberAdd,
    async execute(member) {
        try {
            const memberAmmount = (await member.guild.members.fetch()).filter((c) => !c.user.bot).size;
            const chan = member.client.channels.cache.find((ch) => ch.id === idList.welcomeChannel);
            const userAvatar = await member.client.users.fetch(member.user.id);
            const userUsername = member.user.username;
            member.client.user.setActivity({
                name:`Watching over ` + memberAmmount + ` members in ✨🎉 Bean Temple 🎉✨`,
            });
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
            let amountsuffix = ordinal_suffix_of(memberAmmount);

            const welcomeEmbed = new EmbedBuilder()
                .setTitle( "Hello **" + userUsername + "**, welcome to ✨🎉 **Bean Temple** 🎉✨")
                .setDescription("You are the " + amountsuffix + " member to join\n\n≪•◦❈◦•≫ What to do once you've arrived\n╰┈➤ make yourself known in <#" + idList.introductionsChannel + ">\n╰┈➤ select which roles you would like in <#" + idList.rolesChannel + ">\n╰┈➤ keep up to date with <#" + idList.announcementsChannel + "> and <#" + idList.eventsChannel + "> \n╰┈➤ read about the server  in <#" + idList.aboutChannel + ">\n╰┈➤ look through more information at <#" +  idList.faqChannel + ">" )
                .setImage(userAvatar.displayAvatarURL());
            await chan.send({embeds: [welcomeEmbed]});
        } catch (err) {
            console.error(err);
        }
    }
};