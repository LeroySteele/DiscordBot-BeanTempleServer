// This allows users to view relevant information about the server conveniently. (channels, roles and ownership). It takes no input parameters

const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('This command will show you information about this server.'),
        async execute(interaction) {
            try {
                const chan = interaction.client.channels.cache.find(ch => ch.id === interaction.channelId);
                await interaction.reply({
                    content: "Fetching Server information.", ephemeral: true,
                });
                const serverInfoEmbed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() }) 
                .setColor([50,205,50])
                .setThumbnail( interaction.guild.iconURL() )
                .addFields(
                    { name: 'Owner', value: "<@" + (await interaction.guild.members.fetch(interaction.guild.ownerId)).id + ">" },
                    { name: '\u200B', value: '\u200B' },
                )
                .addFields(
                    { name: 'Members', value: (await interaction.guild.members.fetch()).filter((c) => !c.user.bot).size.toString(), inline: true },
                    { name: 'Bots', value: (await interaction.guild.members.fetch()).filter((c) => c.user.bot).size.toString(), inline: true },
                    { name: 'Roles', value: (interaction.guild.roles.cache.map(role => role.id).length -1).toString(), inline: true }
                )
                .addFields(
                    { name: 'Categories', value: ( interaction.guild.channels.cache.filter(ch => ch.type === ChannelType.GuildCategory).size.toString() ), inline: true },
                    { name: 'Text Channels', value: ( interaction.guild.channels.cache.filter(ch => ch.type === ChannelType.GuildText).size.toString() ), inline: true },
                    { name: 'Voice Channels', value: ( interaction.guild.channels.cache.filter(ch => ch.type === ChannelType.GuildVoice).size.toString() ), inline: true }
                )
                .setFooter( { text: `ID: ${ids.GUILD_ID} | Created on - ${interaction.guild.createdAt.toDateString()}`} );
                await chan.send({
                    embeds: [serverInfoEmbed]
                });
            } catch (err) {
                console.error(err);
            }
        },
};
