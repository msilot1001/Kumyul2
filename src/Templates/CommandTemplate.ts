import { Message, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('Template')
    .setDescription('Template'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: CommandInteraction) => {
    logger.info('SlashExecute');
  },
};

export default command;
