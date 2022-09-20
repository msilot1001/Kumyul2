import {
  BaseMessageComponentOptions,
  MessageActionRow,
  MessageActionRowOptions,
  MessageEmbed,
} from 'discord.js';

export default interface ConfigPage {
  name: string;
  embed: MessageEmbed;
  components?: (
    | MessageActionRow
    | (Required<BaseMessageComponentOptions> & MessageActionRowOptions)
  )[];
}
