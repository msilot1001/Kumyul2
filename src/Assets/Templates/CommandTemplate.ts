import { Message, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('Template')
    .setDescription('Template'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: Interaction) => {
    logger.info('SlashExecute');
  },
};

export default command;
