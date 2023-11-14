import { ActionRowBuilder, APIEmbedFooter } from 'discord.js';
import IParagraph from './IParagraph.js';

export default interface IPage {
  /**
   * UUID is defined automatically, used for components collector
   */
  uuid: string;
  /**
   * Assetcode is to reference pages
   */
  assetcode: string;
  title?: string;
  description?: string;
  author?: { name: string; url?: string; iconurl?: string };
  paragraphs?: IParagraph[];
  color?: number;
  footer?: APIEmbedFooter;
  image?: string; // url
  thumbnail?: string; // url
  timestamp?: Date;
  url?: string;
  actionRows?: ActionRowBuilder[];
}
