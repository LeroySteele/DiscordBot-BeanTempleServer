// Users will appear in our discord server with their 'global name' so administrators can use this command to change their server nickname (display name).

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('nickname')
        .setDescription('Use this command to change a users nickanme')
        .addUserOption((option) => 
            option
            .setName('username')
            .setDescription('Discord username.')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('nickname')
            .setDescription('New nickname')
            .setRequired(true)
        ),
        async execute(interaction) {
            try {
                await interaction.reply({
                    content: "Trying to change users nickname.", ephemeral: true,
                });
                if ( await interaction.member.roles.cache.some(role => role.id === idList.staffRole) ) {
                    const target = interaction.options.getUser('username');
                    const member = interaction.options.getMember('username');
                    const chan = interaction.client.channels.cache.find(ch => ch.id === idList.logsChannel);
                    const userAvatar = await interaction.client.users.fetch(interaction.user.id);
                    if (member.nickname === null) {
                        const logEmbed = new EmbedBuilder()
                        .setAuthor({ name: interaction.user.globalName, iconURL: userAvatar.displayAvatarURL() })
                        .setColor([50,205,50])
                        .setDescription(`<@${interaction.user.id}> has changed <@${member.id}>'s nickname \n${target.globalName}  ->  ${interaction.options.get('nickname').value}.`)
                        .setFooter({ text: `ID: ${interaction.user.id}`});
                        await chan.send({
                            embeds: [logEmbed]
                        });
                    } else {
                        const logEmbed = new EmbedBuilder()
                        .setAuthor({ name: interaction.user.globalName, iconURL: userAvatar.displayAvatarURL() })
                        .setColor([50,205,50])
                        .setDescription(`<@${interaction.user.id}> has changed <@${member.id}>'s nickname \n${member.nickname}  ->  ${interaction.options.get('nickname').value}.`)
                        .setFooter({ text: `ID: ${interaction.user.id}`});
                        await chan.send({
                            embeds: [logEmbed]
                        });
                    }
                    await member.setNickname(interaction.options.get('nickname').value);
                    await interaction.editReply({
                        content: "Users nickname was successfully changed.", ephemeral: true,
                    });
                } else {
                    await interaction.editReply({
                        content: "Only staff can change other users nicknames.", ephemeral: true,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        },
};
