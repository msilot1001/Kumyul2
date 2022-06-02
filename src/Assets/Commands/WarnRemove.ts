import { Message, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('경고차감')
    .setDescription('사용자의 경고를 차감합니다. (기본량: 1) (기본: 자기자신)'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: Interaction) => {
    logger.info('SlashExecute');
  },
};

export default command;
