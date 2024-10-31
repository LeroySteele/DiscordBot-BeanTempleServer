// This comamnd is used by administrators to remove warnings from a user and will remove the warning role

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('removewarn')
        .setDescription('Use this command to remove a warn from a user')
        .addUserOption((option) => 
            option
            .setName('username')
            .setDescription('Discord username.')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('warn-remove-reason')
            .setDescription('What is the reason for removing this warn.')
            .setRequired(true)
        ),
        async execute(interaction) {
            try {
                await interaction.reply({
                    content: "Removeing a warn from the user.", ephemeral: true,
                });
                if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                    const member = interaction.options.getMember('username');
                    const warnReason = interaction.options.get('warn-remove-reason').value;
                    let warnType = " ";
                    let firstWarn = false;
                    let secondWarn = false;
                    let finalWarn = false;
                    if ( await member.roles.cache.has(idList.warnOneRole) ) {
                        firstWarn = true;
                    };
                    if ( await member.roles.cache.has(idList.warnTwoRole) ) {
                        secondWarn = true;
                    };
                    if ( await member.roles.cache.has(idList.warnFinalRole) ) {
                        finalWarn = true;
                    };
                    if ( finalWarn === true ) {
                        await interaction.editReply({
                            content: "This user's Final warning has been removed.", ephemeral: true,
                        });
                        await member.roles.remove(idList.warnFinalRole);
                        warnType = idList.warnFinalRole;
                        logWarnRemoval();
                    }else if ( secondWarn === true ) {
                        await member.roles.remove(idList.warnTwoRole);
                        await interaction.editReply({
                            content: "This user's Second warning has been removed.", ephemeral: true,
                        });
                        warnType = idList.warnTwoRole;
                        logWarnRemoval();
                    }else if ( firstWarn === true ) {
                        await member.roles.remove(idList.warnOneRole);
                        await interaction.editReply({
                            content: "This user's First warning has been removed.", ephemeral: true,
                        });
                        warnType = idList.warnOneRole;
                        logWarnRemoval();
                    } else {
                        await interaction.editReply({
                            content: "This person has no warnings to remove!", ephemeral: true,
                        });
                    }
                    async function logWarnRemoval() {
                        const chan = interaction.client.channels.cache.find(ch => ch.id === idList.logsChannel);
                        const staffAvatar = await interaction.client.users.fetch(interaction.user.id);
                        const logEmbed = new EmbedBuilder()
                        .setAuthor({ name: interaction.user.globalName + " has removed a warning", iconURL: staffAvatar.displayAvatarURL() })
                        .setColor([50,205,50])
                        .setDescription(`<@&${warnType}> has been removed from <@${member.id}>\n\n**Reason**: ` + warnReason)
                        .setThumbnail( member.displayAvatarURL())
                        .setFooter({ text: `ID: ${member.id}`});
                        await chan.send({
                            embeds: [logEmbed]
                        });
                    }
                } else {
                    await interaction.editReply({
                        content: "Only staff can remove warnings from users.", ephemeral: true,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        },
};
