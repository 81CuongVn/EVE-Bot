const { ButtonInteraction, Client, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const DB = require('../../../models/SuggestSystem')

module.exports = {
    data: {
        name: "suggest-decline"
    },
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guildId, message, member } = interaction;
        
        if(!member.permissions.has('Administrator')) return interaction.reply({ content: '❌ You need to be an Administrator to perform this action.', ephemeral: true });

        DB.findOne({GuildID: guildId, MessageID: message.id}, async(err, data) => {
            if(err) throw er;
            if(!data) return interaction.reply({ content: "No data was found in the database", ephemeral: true });

            const Embed = message.embeds[0]
            if(!Embed) return;

            Embed.fields[2] = { name: "Status", value: "❌ Declined", inline: true }
            Embed.color == 0xd93d3d;
            message.edit({ embeds: [Embed], components: []});
            interaction.reply({content: "Suggestion ❌ Declined", ephemeral: true});
        })
    }
}