import { Message, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('공지')
    .setDescription('공지 채널에 공지를 보내요!'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: CommandInteraction) => {
    logger.info('SlashExecute');
  },
};

export default command;
