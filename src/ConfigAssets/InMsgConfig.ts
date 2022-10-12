import {
  ActionRowBuilder,
  CommandInteraction,
  BaseInteraction,
  ButtonInteraction,
  ComponentType,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
  InteractionCollector,
  InteractionType,
  MessageComponentInteraction,
  CollectedInteraction,
} from 'discord.js';
import ConfigPage from '../Interfaces/IConfigPage.js';
import InOutPage from './InOutPage.js';
import { client } from '../BotEvent/BotEvent.js';
import logger from '../Utils/Logger.js';

function parseString(string: string, interaction: BaseInteraction) {
  const ctx = string;

  ctx.replace(/\${usermention}/, `<@${interaction.user.id}`);
  ctx.replace(/\${guildname}/, `${interaction.guild?.name}`);
}

const InMsgConfig = (
  interaction: BaseInteraction,
  uuid: string,
): Promise<
  (interaction1: BaseInteraction, uuid1: string) => Promise<ConfigPage>
> =>
  new Promise<
    (interaction2: BaseInteraction, uuid2: string) => Promise<ConfigPage>
  >(async (resolve, reject) => {
    const parentPage = InOutPage;

    // const modal = new ModalBuilder()
    //   .setCustomId(`cmodal.${uuid}`)
    //   .setTitle('입장 메세지 설정')
    //   .addComponents(
    //     new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
    //       new TextInputBuilder()
    //         .setCustomId(`cmodal.${uuid}.title`)
    //         .setLabel('제목')
    //         // Paragraph means multiple lines of text.
    //         .setStyle(TextInputStyle.Short),
    //     ),
    //     new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
    //       new TextInputBuilder()
    //         .setCustomId(`cmodal.${uuid}.title`)
    //         .setLabel('설명')
    //         // Paragraph means multiple lines of text.
    //         .setStyle(TextInputStyle.Paragraph),
    //     ),
    //   );

    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId(`cmodal.${uuid}`)
      .setTitle('입장 메시지 설정');

    // Add components to modal

    // Create the text input components
    const input1 = new TextInputBuilder()
      .setCustomId(`cmodal.${uuid}.title`)
      .setLabel('제목')
      .setStyle(TextInputStyle.Short);

    const input2 = new TextInputBuilder()
      .setCustomId(`cmodal.${uuid}.desc`)
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

    (interaction as ButtonInteraction).showModal(modal);

    // collector
    const collector = new InteractionCollector(client, {
      guild: interaction.guild!,
      interactionType: InteractionType.ModalSubmit,
    });

    collector.filter = (i: CollectedInteraction) =>
      i.user.id === interaction.user.id;

    collector.on('collect', (i: ModalSubmitInteraction) => {
      if (i.customId === `cmodal.${uuid}`) {
        const title = i.fields.getTextInputValue(`cmodal.${uuid}.title`);
        const desc = i.fields.getTextInputValue(`cmodal.${uuid}.desc`);

        logger.info(`modal title:${title}, desc: ${desc}`);

        i.reply(`modal title:${title}, desc: ${desc}`);

        collector.stop();

        const prefix = `cdec.${uuid}.config.`;

        // 콜렉터 필터
        // eslint-disable-next-line no-shadow
        const filter = (i: MessageComponentInteraction) => {
          return (
            i.customId.startsWith(prefix) && i.user.id === interaction.user.id
          );
        };

        // 컴포넌트 콜렉터 생성
        const buttoncollector = (
          interaction! as CommandInteraction
        ).channel!.createMessageComponentCollector({
          filter,
          componentType: ComponentType.Button,
        });

        resolve(parentPage);
      }
    });
  });

export default InMsgConfig;
