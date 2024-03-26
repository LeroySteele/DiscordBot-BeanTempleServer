const { Events } = require("discord.js")
const { MongoClient } = require('mongodb');
const ids = require('../data/ids.js');
const idList = require('../data/idList.js');

module.exports = {
    name: Events.MessageReactionRemove,
    async execute(reaction, user) {
        try {
            if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.genderMaleReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.maleGenderRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel &&reaction.emoji.name === idList.genderFemaleReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.femaleGenderRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.genderOtherReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.otherGenderRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.heReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.heRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.sheReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.sheRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.theyReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.theyRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            }
            else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.introvertReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.introvertRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.extrovertReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.extrovertRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.nighOwlReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.nightOwlRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.earlyBirdReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.earlyBirdRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            }
            else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.gamerReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.gamerRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.movieBuffReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.movieBuffRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.artistReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.artistRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.weebReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.weebRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.bookWormReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.bookWormRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.techGuruReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.techGuruRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.foodieReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.foodieRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            }
            else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.africaReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.africaRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.europeReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.europeRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.northAmericaReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.northAmericaRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.southAmericaReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.southAmericaRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.asiaReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.asiaRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.australiaReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.australiaRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            }
            else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.announcementReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.announcementsRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.liveReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.liveRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.eventReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.eventsRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            } else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.socialReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.socialRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.remove(role);
            }
        } catch (err) {
            console.error(err);
        }
    }
};