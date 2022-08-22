import { Message, BaseCommandInteraction, CacheType } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default interface ICommand {
  Builder: SlashCommandBuilder;
  MsgExecute: (message: Message) => Promise<void>;
  SlashExecute: (interaction: BaseCommandInteraction) => Promise<void>;
}
