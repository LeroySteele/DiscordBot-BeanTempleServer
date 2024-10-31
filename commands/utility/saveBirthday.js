// This command allows users to save thier birthday to the database, so the bot can wish them on their day

const { SlashCommandBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const ids = require('../../data/ids.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Use this command to save your birthday.')
        .addStringOption((option) => 
            option
            .setName('birthyear')
            .setDescription('Enter which year you were born in. eg  "2005"')
            .setRequired(true)
        )
        .addStringOption((option) => 
            option
            .setName('birthmonth')
            .setDescription('Select which month you were born in. eg  "November"')
            .setRequired(true)
            .setChoices(
                {name: 'January',value: '1',},
                {name: 'February',value: '2',},
                {name: 'March',value: '3',},
                {name: 'April',value: '4',},
                {name: 'May',value: '5',},
                {name: 'June',value: '6',},
                {name: 'July',value: '7',},
                {name: 'August',value: '8',},
                {name: 'September',value: '9',},
                {name: 'October',value: '10',},
                {name: 'November',value: '11',},
                {name: 'December',value: '12',}
            )
        )
        .addStringOption((option) => 
            option
            .setName('birthdate')
            .setDescription('Enter which date you were born on (1-31). eg  "24" ')
            .setRequired(true)
        ),
    async execute(interaction) {
        try {
            await interaction.reply({
                content: "Trying to save your birthday.", ephemeral: true,
            });
            const birthyear = parseInt(interaction.options.get("birthyear").value);
            const birthmonth = parseInt(interaction.options.get("birthmonth").value);
            const birthdate = parseInt(interaction.options.get("birthdate").value);
            const memberid = interaction.user.id;
            if ( birthyear < 2024 && birthyear > 1924 && Number.isInteger(birthyear) && birthdate > 0 && birthdate < 32 && Number.isInteger(birthdate) ) {
                const data = new MongoClient(ids.MONGO_DB_URL_BIRTHDAYS);
                await data.connect();
                const db = data.db(ids.DB_NAME_BIRTHDAYS);
                const collection = db.collection(ids.COLLECT_NAME_BIRTHDAYS);
                if ((await collection.findOne({ memberid: memberid })) === null) {
                    await collection.insertOne({memberid: memberid, birthyear: birthyear, birthmonth: birthmonth, birthdate: birthdate});
                    await interaction.editReply({
                        content: "Your birthday has been saved.", ephemeral: true,
                    });
                } else {
                    await interaction.editReply({
                        content: "Your birthday is already in our database. If you believe this is incorrect, speak to an admin", ephemeral: true,
                    });
                }
                
            }else {
                await interaction.editReply({
                    content: "The birthday you entered is invalid, please try again.", ephemeral: true,
                });
            }
        } catch (err) {
            console.error(err);
        }
    },
};
