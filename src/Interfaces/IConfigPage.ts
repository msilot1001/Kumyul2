import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';

export default interface ConfigPage {
  name: string;
  embed: EmbedBuilder;
  components: ActionRowBuilder<ButtonBuilder>[];
}
