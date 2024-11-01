// This command allows users to view all the accessible commands from this bot (hard coded list). This command takes no input parameters

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Use this to see all the bots commands'),
        async execute(interaction) {
            try {
                const chan = interaction.client.channels.cache.find(ch => ch.id === interaction.channel.id);
                await interaction.reply({
                    content: "Fetching command list.", ephemeral: true,
                });
                const comEmbed = new EmbedBuilder()
                .setTitle("BB Command List")
                .setDescription(
                    "- /birthday \nUse this command to save your birthday so we can wish you on your special day" +
                    "\n\n- /level \nThis command will display your level based on your chat activity" +
                    "\n\n- /serverinfo \nUse this command to view information about this server" +
                    "\n\n- /staff \nThis will display all the staff members in this server" 
                )
                await chan.send({
                    embeds: [comEmbed]
                });

                if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                    const staffEmbed = new EmbedBuilder()
                    .setTitle("BB Staff Command List")
                    .setDescription(
                        "\n\n- /nickanme \nUse this command to change a users nickname" +
                        "\n\n- /warnuser \nThis command will add a warn for misbehaving people" +
                        "\n\n- /removewarn \nThis command removes a warn if they are behaving" + 
                        "\n\n- /userinfo \nThis will show all info about a user"
                    )
                    await chan.send({
                        embeds: [staffEmbed]
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
};
