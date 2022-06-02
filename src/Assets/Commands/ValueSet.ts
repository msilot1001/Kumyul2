import { Message, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('한도설정')
    .setDescription('이 서버의 한도를 지정합니다.'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: Interaction) => {
    logger.info('SlashExecute');
  },
};

export default command;
