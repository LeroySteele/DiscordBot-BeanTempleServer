const { Events } = require("discord.js")
const { MongoClient } = require('mongodb');
const ids = require('../data/ids.js');
const idList = require('../data/idList.js');

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user){
        try {
            if ( user.id === ids.CLIENT_ID ) {
                //do nothing
            } else if ( reaction.message.channelId === idList.VerifiedChannel && reaction.emoji.name === idList.verifiedReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.verifiedRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
                const roleAssigned = reaction.message.guild.roles.cache.find((r) => r.id === idList.assignedRolesHeading);
                await member.roles.add(roleAssigned);
                const roleAchieve = reaction.message.guild.roles.cache.find((r) => r.id === idList.achieveableRolesHeading);
                await member.roles.add(roleAchieve);
                const rolePersonalised = reaction.message.guild.roles.cache.find((r) => r.id === idList.personalisedRolesHeading);
                await member.roles.add(rolePersonalised);
                const roleSpecial = reaction.message.guild.roles.cache.find((r) => r.id === idList.specialRolesHeading);
                await member.roles.add(roleSpecial);
                const roleNotification = reaction.message.guild.roles.cache.find((r) => r.id === idList.notificationsHeading);
                await member.roles.add(roleNotification);
                const roleWarnings = reaction.message.guild.roles.cache.find((r) => r.id === idList.warningsHeading);
                await member.roles.add(roleWarnings);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.genderMaleReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.maleGenderRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.genderFemaleReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.femaleGenderRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.genderOtherReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.otherGenderRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.heReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.heRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.sheReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.sheRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.theyReaction ) {
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.theyRole);
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.introvertReaction ) {
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.introvertRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.extrovertReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.extrovertRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.nighOwlReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.nightOwlRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.earlyBirdReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.earlyBirdRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.gamerReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.gamerRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.movieBuffReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.movieBuffRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.artistReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.artistRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.weebReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.weebRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.bookWormReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.bookWormRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.techGuruReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.techGuruRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.foodieReaction ) {   
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.foodieRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.africaReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.africaRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.europeReaction ) {  
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.europeRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.northAmericaReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.northAmericaRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.southAmericaReaction ) {
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.southAmericaRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.asiaReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.asiaRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.australiaReaction ) {
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.australiaRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.announcementReaction ) { 
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.announcementsRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.liveReaction ) {
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.liveRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.eventReaction ) {
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.eventsRole);
                await member.roles.add(role);
            }else if ( reaction.message.channelId === idList.rolesChannel && reaction.emoji.name === idList.socialReaction ) {
                const { guild } = reaction.message;
                const member = guild.members.cache.find((member) => member.id === user.id);
                const role = reaction.message.guild.roles.cache.find((r) => r.id === idList.socialRole);
                await member.roles.add(role);
            }
        } catch (err) {
            console.error(err);
        }
    }
};