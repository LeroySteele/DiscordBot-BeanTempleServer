// This command allows users to view all active administrators of the server and their rank

const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const idList = require('../../data/idList.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Use this command to view a list of staff members in this server'),
    async execute(interaction) {
        try {
            const chan = interaction.client.channels.cache.find(ch => ch.id === interaction.channel.id);
            await interaction.reply({
                content: "Fetching staff list.", ephemeral: true,
            });

            await interaction.guild.members.fetch();
            const staffEmbed = new EmbedBuilder()
            .setTitle("Staff members of  ✨ BEan TEmple ✨")
            .setDescription(
                `\n\n<@&${idList.ownerRole}>:\n` +  interaction.guild.roles.cache.get(idList.ownerRole).members.map(m=>m.user).join('\n') + 
                `\n\n<@&${idList.headAdmin}>:\n` +  interaction.guild.roles.cache.get(idList.headAdmin).members.map(m=>m.user).join('\n') + 
                `\n\n<@&${idList.admins}>:\n` +  interaction.guild.roles.cache.get(idList.admins).members.map(m=>m.user).join('\n') + 
                `\n\n<@&${idList.trialAdmin}>:\n` +  interaction.guild.roles.cache.get(idList.trialAdmin).members.map(m=>m.user).join('\n') + 
                `\n\n<@&${idList.headMod}>:\n` +  interaction.guild.roles.cache.get(idList.headMod).members.map(m=>m.user).join('\n') + 
                `\n\n<@&${idList.mods}>:\n` +  interaction.guild.roles.cache.get(idList.mods).members.map(m=>m.user).join('\n') + 
                `\n\n<@&${idList.trialMod}>:\n` +  interaction.guild.roles.cache.get(idList.trialMod).members.map(m=>m.user).join('\n')
            )
            await chan.send({
                embeds: [staffEmbed]
            });
        } catch (err) {
            console.error(err);
        }
    }
};
