/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Message,
  BaseCommandInteraction,
  MessageEmbed,
  MessageActionRow,
  BaseMessageComponentOptions,
  MessageActionRowOptions,
  MessageButton,
  MessageComponentInteraction,
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { v1 } from 'uuid';
import ICommand from '../Interfaces/ICommand.js';
import logger from '../Utils/Logger.js';
import { color, url } from '../Config/EmbedConfig.js';
import { GuildClass, GuildModel } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';
import MainPage from '../ConfigAssets/MainPage.js';
import OrdinaryPage from '../ConfigAssets/OrdinaryPage.js';
import InOutPage from '../ConfigAssets/InOutPage.js';
import BotAutoRoleConfig from '../ConfigAssets/BotAutoRoleConfig.js';
import InMsgConfig from '../ConfigAssets/InMsgConfig.js';
import UserAutoRoleConfig from '../ConfigAssets/UserAutoRoleConfig.js';
import SysChConfig from '../ConfigAssets/SysChConfig.js';
import OutMsgConfig from '../ConfigAssets/OutMsgConfig.js';

// #region Pages
const PageTemplate = (
  interaction: BaseCommandInteraction,
  guildData: GuildClass,
  uuid: string,
) => {
  const page: ConfigPage = {
    name: 'main',
    embed: new MessageEmbed()
      .setColor(color)
      .setAuthor({ name: '시덱이', iconURL: url })
      .setTitle(`${interaction.guild!.name}의 서버 설정`)
      .setDescription('바꾸고 싶은 설정 창을 열어주세요.')
      .addFields(
        { name: '일반 설정', value: '기본적인 관리 설정' },
        { name: '입/퇴장 설정', value: '입/퇴장 메세지 설정' },
        { name: '경고 설정', value: '경고 관련 설정' },
        { name: '공지 설정', value: '공지 관련 설정' },
        { name: '레벨링 설정', value: '레벨링 시스템 설정' },
        { name: '티켓 설정', value: '티켓 관련 설정' },
        { name: '멤버 설정', value: '멤버 관리 설정' },
      ),
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('일반 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.ordinary`),
        new MessageButton()
          .setLabel('입/퇴장 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.inout`),
        new MessageButton()
          .setLabel('경고 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.warn`),
        new MessageButton()
          .setLabel('공지 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.notice`),
        new MessageButton()
          .setLabel('레벨링 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.level`),
      ),
      new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('티켓 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.ticket`),
        new MessageButton()
          .setLabel('멤버 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.member`),
      ),
    ],
  };

  return page;
};

// const PageList: ((
//   interaction: BaseCommandInteraction,
//   guildData: GuildClass,
//   uuid: string,
// ) => Promise<ConfigPage>)[] = [MainPage, OrdinaryPage, InOutPage];

const PageList = new Map<
  string,
  (interaction: BaseCommandInteraction, uuid: string) => Promise<ConfigPage>
>();
PageList.set('main', MainPage);
PageList.set('ordinary', OrdinaryPage);
PageList.set('inout', InOutPage);

const ExecuteList = new Map<
  string,
  (
    interaction: BaseCommandInteraction,
    uuid: string,
  ) => Promise<
    (interaction1: BaseCommandInteraction, uuid1: string) => Promise<ConfigPage>
  >
>();
ExecuteList.set('syschconfig', SysChConfig);
ExecuteList.set('userroleconfig', UserAutoRoleConfig);
ExecuteList.set('botroleconfig', BotAutoRoleConfig);
ExecuteList.set('inmsgconfig', InMsgConfig);
ExecuteList.set('outmsgconfig', OutMsgConfig);

export { PageList, ExecuteList };

// #endregion

// ⚠️ 열지마라 이거
const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('서버설정')
    .setDescription('서버의 설정을 변경합니다.'),
  MsgExecute: async (msg: Message) => {
    logger.info('MsgExecute');
  },
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const channel = interaction.channel;
    const guild = interaction.guild;

    if (!guild) return;
    if (!channel) return;

    const uuid = v1();

    logger.info(uuid);

    const guilddata = await GuildModel.findOne({ id: guild!.id });

    // 가입해 닝겐
    if (!guilddata) {
      interaction.reply({
        content:
          '이 길드는 시덱이 서비스에 등록되어있지 않아요! 관리자에게 요청해보세요!',
        ephemeral: true,
      });

      return;
    }

    // 페이지 구하기
    const pagename = 'main';

    const page = PageList.get(pagename);

    let replymsg: Message;

    // 메인페이지 전송
    if (page) {
      replymsg = (await interaction.reply({
        embeds: [(await page(interaction, uuid)).embed],
        components: (await page(interaction, uuid)).components,
        fetchReply: true,
      })) as Message;
    }

    const prefix = `cdec.${uuid}.config.`;

    // 콜렉터 필터
    const filter = (i: MessageComponentInteraction) => {
      return i.customId.startsWith(prefix) && i.user.id === interaction.user.id;
    };

    // 컴포넌트 콜렉터 생성
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: 'BUTTON',
    });

    collector.on('collect', async i => {
      const executecode = i.customId.substring(prefix.length);
      logger.info(executecode);

      // 설정창
      if (executecode.startsWith('execute')) {
        const code = executecode.substring(8);

        if (!ExecuteList.has(code)) {
          logger.info('Page Not Found 404');
          return;
        }

        const execute = ExecuteList.get(code);

        if (execute) {
          await replymsg.delete();

          // execute 하기
          const returnpage = await execute(interaction, uuid);

          logger.info('send execute end page');

          replymsg = await channel.send({
            embeds: [(await returnpage(interaction, uuid)).embed],
            components: (await returnpage(interaction, uuid)).components,
          });
        }
      } else {
        const executepage = PageList.get(executecode);

        // 메인페이지 전송
        if (executepage) {
          await replymsg.delete();

          logger.info('send return page');

          replymsg = (await i.reply({
            embeds: [(await executepage(interaction, uuid)).embed],
            components: (await executepage(interaction, uuid)).components,
            fetchReply: true,
          })) as Message<boolean>;
        } else {
          logger.info('Page Not Found 404');
        }
      }
    });
  },
};

export default command;
