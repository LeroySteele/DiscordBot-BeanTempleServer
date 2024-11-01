// This command connects to the database and allows users to check their own activity level. It takes no input parameters

const { SlashCommandBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('This command will show your level within this discord.'),
        async execute(interaction) {
            try {
                await interaction.reply({
                    content: "Fetching your discord level", ephemeral: true,
                })
                const data = new MongoClient(ids.MONGO_DB_URL_lvl);
                await data.connect();
                const db = data.db(ids.DB_NAME_lvl);
                const collection = db.collection(ids.COLLECT_NAME_lvl)
                const playerlvl = await collection.findOne({ memberid: interaction.member.id,});
                await interaction.editReply({
                    content: `You are currently on level: ${playerlvl.level}`, ephemeral: true,
                });
            } catch (err) {
                console.error(err);
            }
        },
};
