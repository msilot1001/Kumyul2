import {
  Message,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalActionRowComponentBuilder,
  InteractionCollector,
  InteractionType,
  CollectedInteraction,
  ModalSubmitInteraction,
} from 'discord.js';
import { randomUUID } from 'crypto';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';
import { VoteModel } from '../Database/VoteSchema.js';
import { url } from '../Config/EmbedConfig.js';
import { client } from '../EventHandler/index.js';

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('투표')
    .setDescription('찬반투표를 개설합니다.'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: CommandInteraction) => {
    if (!interaction.guild) return;
    if (!interaction.member) return;

    if (
      !(interaction.member?.permissions as PermissionsBitField)
        .toArray()
        .includes('ManageGuild') &&
      !(interaction.member?.permissions as PermissionsBitField)
        .toArray()
        .includes('Administrator')
    ) {
      interaction.reply({
        content: '이 명령어를 실행하려면 서버 관리하기 권한이 필요해요!',
        ephemeral: true,
      });

      return;
    }

    const id = `${randomUUID()}`;

    // modal 생성
    const modal = new ModalBuilder()
      .setCustomId(`cvotemodal.${id}`)
      .setTitle('찬반투표 개설');

    const input1 = new TextInputBuilder()
      .setCustomId(`cvotemodal.${id}.topic`)
      .setLabel('주제')
      .setStyle(TextInputStyle.Short);

    const input2 = new TextInputBuilder()
      .setCustomId(`cvotemodal.${id}.desc`)
      .setLabel('설명')
      .setStyle(TextInputStyle.Paragraph);

    const actionRow1 =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        input1,
      );
    const actionRow2 =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        input2,
      );

    modal.addComponents(actionRow1, actionRow2);

    interaction.showModal(modal);

    // collector
    const collector = new InteractionCollector(client, {
      guild: interaction.guild!,
      interactionType: InteractionType.ModalSubmit,
    });

    collector.filter = (i: CollectedInteraction) =>
      i.user.id === interaction.user.id;

    collector.on('collect', async (i: ModalSubmitInteraction) => {
      if (i.customId === `cvotemodal.${id}`) {
        const topic = i.fields.getTextInputValue(`cvotemodal.${id}.topic`);
        const desc = i.fields.getTextInputValue(`cvotemodal.${id}.desc`);

        collector.stop();

        const embed = new EmbedBuilder()
          .setColor('#4caf50')
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

        const msg = await i.reply({
          embeds: [embed],
          components: [buttons],
          fetchReply: true,
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
          content: '투표를 성공적으로 생성했어요!',
          ephemeral: true,
        });
      }
    });
  },
};

export default command;
