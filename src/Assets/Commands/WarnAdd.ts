import { Message, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('경고')
    .setDescription(
      '사용자에게 경고를 부여합니다. (기본량: 1) (기본: 자기자신)',
    ),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    logger.info('SlashExecute');
    interaction.reply('WarnAdd Command');
  },
};

export default command;
