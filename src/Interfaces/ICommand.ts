import { Message, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default interface ICommand {
  Builder: SlashCommandBuilder;
  MsgExecute: (message: Message) => Promise<void>;
  SlashExecute: (interaction: CommandInteraction) => Promise<void>;
}
