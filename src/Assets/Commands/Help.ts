import { Message, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('도움말')
    .setDescription('명령어에 대한 도움말을 출력합니다.'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: Interaction) => {
    logger.info('SlashExecute');
  },
};

export default command;
