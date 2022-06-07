import { Message, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('투표')
    .setDescription('찬반투표를 개설합니다.'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    logger.info('SlashExecute');
    interaction.reply('Vote command');
  },
};

export default command;
