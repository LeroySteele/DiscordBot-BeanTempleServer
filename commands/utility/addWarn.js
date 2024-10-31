// This command is used by administrators to issue a warning to a user for mis-conduct and will assign them a warning role

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('warnuser')
        .setDescription('Use this command to warn a user')
        .addUserOption((option) => 
            option
            .setName('username')
            .setDescription('Discord username.')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('warn-reason')
            .setDescription('What is the reason for this warn.')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.reply({
                content: "Warning the user.", ephemeral: true,
            });
            if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                const member = interaction.options.getMember('username');
                const warnReason = interaction.options.get('warn-reason').value;
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
                        content: "This user has already received a final warning, please consider a kick/ban for this offence.", ephemeral: true,
                    });
                }else if ( secondWarn === true ) {
                    await member.roles.add(idList.warnFinalRole);
                    await interaction.editReply({
                        content: "This person has been given a 'Final warning'", ephemeral: true,
                    });
                    warnType = idList.warnFinalRole;
                    await logWarn();
                }else if ( firstWarn === true ) {
                    await member.roles.add(idList.warnTwoRole);
                    await interaction.editReply({
                        content: "This person has been given a 'Second warning'", ephemeral: true,
                    });
                    warnType = idList.warnTwoRole;
                    await logWarn();
                } else {
                    await member.roles.add(idList.warnOneRole);
                    await interaction.editReply({
                        content: "This person has been given a 'First warning'", ephemeral: true,
                    });
                    warnType = idList.warnOneRole;
                    await logWarn();
                }
                async function logWarn() {
                    const chan = interaction.client.channels.cache.find(ch => ch.id === idList.logsChannel);
                    const staffAvatar = await interaction.client.users.fetch(interaction.user.id);
                    const logEmbed = new EmbedBuilder()
                    .setAuthor({ name: interaction.user.globalName + " has issued a warning", iconURL: staffAvatar.displayAvatarURL() })
                    .setColor([255,0,0])
                    .setDescription(`<@${member.id}> has received a <@&${warnType}>\n\nWarn Reason: ` + warnReason)
                    .setThumbnail( member.displayAvatarURL())
                    .setFooter({ text: `ID: ${member.id}`});
                    await chan.send({
                        embeds: [logEmbed]
                    }); 
                }
            }else {
                await interaction.editReply({
                    content: "Only staff can warn users.", ephemeral: true,
                });
            }
        }catch(err) {
            console.error(err);
        }
    },
};
