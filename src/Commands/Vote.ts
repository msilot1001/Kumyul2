import {
  Message,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
  ButtonStyle,
} from 'discord.js';
import { v4 } from 'uuid';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';
import { VoteModel } from '../Database/VoteSchema.js';
import { url } from '../Config/EmbedConfig.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('투표')
    .setDescription('찬반투표를 개설합니다.')
    .addStringOption(option =>
      option.setName('주제').setDescription('투표의 주제').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('설명').setDescription('투표의 설명'),
    ) as SlashCommandBuilder,
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: CommandInteraction) => {
    if (!interaction.guild) return;
    if (!interaction.member) return;

    const topic = (
      interaction.options as CommandInteractionOptionResolver
    ).getString('주제');

    const desc = (
      interaction.options as CommandInteractionOptionResolver
    ).getString('설명');

    if (!topic) return;

    if (
      !(interaction.member?.permissions as PermissionsBitField)
        .toArray()
        .includes('ManageGuild')
    ) {
      interaction.reply({
        content: '이 명령어를 실행하려면 서버 관리하기 권한이 필요해요!',
        ephemeral: true,
      });

      return;
    }

    const id = `${v4()}`;

    try {
      const embed = new EmbedBuilder()
        .setColor('#46b950')
        .setAuthor({ name: '시덱이', iconURL: url })
        .setTitle(topic)
        .setDescription(desc || '새 투표에요!')
        .addFields(
          { name: '찬성', value: '0', inline: true },
          { name: '반대', value: '0', inline: true },
        )
        .setFooter({
          text: `${interaction.user.username}#${interaction.user.discriminator}님이 시작했어요!`,
        });

      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(`cdvo.${id}_agree`)
          .setLabel('👍')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`cdvo.${id}_disagree`)
          .setLabel('👎')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId(`cdvo.${id}_lock`)
          .setLabel('🔒')
          .setStyle(ButtonStyle.Secondary),
      );

      const msg = await interaction.channel!.send({
        embeds: [embed],
        components: [buttons],
      });

      await VoteModel.create({
        id,
        topic,
        msgid: msg.id,
        description: desc || null,
        agree: 0,
        disagree: 0,
        uservoted: new Map<string, boolean>(),
        maker: interaction.user.id,
        makername: `${interaction.user.username}#${interaction.user.discriminator}`,
      });

      interaction.reply({
        content: '성공적으로 투표를 생성했어요!',
        ephemeral: true,
      });
    } catch (err) {
      logger.error(err);
    }
  },
};

export default command;
