import { Message, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('경고지정')
    .setDescription('사용자의 경고를 지정합니다. (기본: 자기자신)'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    logger.info('SlashExecute');
    interaction.reply('WarnSet Command');
  },
};

export default command;
