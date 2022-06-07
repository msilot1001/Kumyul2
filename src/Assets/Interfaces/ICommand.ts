import { Message, BaseCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

interface ICommand {
  Builder: SlashCommandBuilder;
  MsgExecute: (message: Message) => Promise<void>;
  SlashExecute: (interaction: BaseCommandInteraction) => Promise<void>;
}

export default ICommand;
