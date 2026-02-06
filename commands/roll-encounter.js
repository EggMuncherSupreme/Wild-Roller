const { ApplicationCommandOptionType } = require('discord.js');
const fs = require("fs")

const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);


module.exports = {
    data: {
        name: 'roll-encounters',
        description: `Rolls a number of encounters in a given biome.`,
        options: [
            {
                name: 'biome',
                description: 'The biome to hunt in.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Woodlands',
                        value: 'woodlands'
                    },
                    {
                        name: 'Grasslands',
                        value: 'grasslands'
                    },
                    {
                        name: 'River',
                        value: 'river'
                    },
                    {
                        name: 'Temperate Forest',
                        value: 'temperateforest'
                    },
                    {
                        name: 'Jungle',
                        value: 'jungle'
                    },
                    {
                        name: 'Field',
                        value: 'field'
                    },
                    {
                        name: 'City',
                        value: 'city'
                    },
                    {
                        name: 'Electromagnetic Area',
                        value: 'electromagneticarea'
                    },
                    {
                        name: 'Volcano',
                        value: 'volcano'
                    },
                    {
                        name: 'Cave',
                        value: 'cave'
                    },
                    {
                        name: 'Mountain',
                        value: 'mountain'
                    },
                    {
                        name: 'Desert',
                        value: 'desert'
                    },
                    {
                        name: 'Badlands',
                        value: 'badlands'
                    },
                    {
                        name: 'Pond',
                        value: 'pond'
                    },
                    {
                        name: 'Lake',
                        value: 'lake'
                    },
                    {
                        name: 'Beach',
                        value: 'beach'
                    },
                    {
                        name: 'Open Ocean',
                        value: 'openocean'
                    },
                    {
                        name: 'Tropical Sea',
                        value: 'tropicalsea'
                    },
                    {
                        name: 'Polar Sea',
                        value: 'polarsea'
                    },
                    {
                        name: 'Oceanic Abyss',
                        value: 'oceanicabyss'
                    },
                    {
                        name: 'Swamp',
                        value: 'swamp'
                    },
                    {
                        name: 'Glacier / Icy Cave',
                        value: 'glaciericycave'
                    },
                    {
                        name: 'Tundra / Boreal Forest',
                        value: 'tundraborealforest'
                    },
                    {
                        name: 'Ruins / Cemetery',
                        value: 'ruinscemetery'
                    },
                ]
            },
            {
                name: 'amount',
                description: 'The number of hunts being done.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },

    run: async ({ interaction }) => {
        if (!interaction.inGuild()){
            interaction.reply({
                content: "You can only run this command inside a server.",
                ephemeral: true,
            });
        return;
        }

        var biome = interaction.options.getString('biome');
        var amount = interaction.options.getNumber('amount');

        let mons = readFileLines('./biomes/' + biome + '.txt');
        let natures = readFileLines('./natures.txt');
        
        var output = 'You found the following Pokémon:\n';

        for(let i = 0; i < amount; i++){
            var mon = mons[Math.floor(Math.random()*mons.length)];
            var nature = natures[Math.floor(Math.random()*natures.length)];
            output = output + 'A ' + nature + ' ' + mon + '!\n';
        }

        interaction.reply(`${output}`);
    }
};
