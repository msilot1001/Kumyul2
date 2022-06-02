import { Message, Interaction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

interface ICommand {
  Builder: SlashCommandBuilder;
  MsgExecute: (message: Message) => Promise<void>;
  SlashExecute: (interaction: Interaction) => Promise<void>;
}

export default ICommand;
