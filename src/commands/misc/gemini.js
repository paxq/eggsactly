const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();


module.exports = {
    name: "gemini",
    description: "test gemini integration",
    
    callback: async (client, interaction) => {
        const ai = new GoogleGenAI({});

        const response = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: "Explain how AI works in a few words",
        });

        console.log("API Response:\n");
        console.log(response.output_text);

        await interaction.reply({content: "test", ephemeral: true})
    }
}