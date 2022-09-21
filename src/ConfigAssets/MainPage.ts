import {
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { color, url } from '../Config/EmbedConfig.js';
import ConfigPage from '../Interfaces/IConfigPage.js';

const MainPage = async (interaction: CommandInteraction, uuid: string) => {
  const page: ConfigPage = {
    name: 'main',
    embed: new EmbedBuilder()
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
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel('일반 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.ordinary`),
        new ButtonBuilder()
          .setLabel('입/퇴장 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.inout`),
        new ButtonBuilder()
          .setLabel('경고 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.warn`),
        new ButtonBuilder()
          .setLabel('공지 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.notice`),
        new ButtonBuilder()
          .setLabel('레벨링 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.level`),
      ),
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel('티켓 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.ticket`),
        new ButtonBuilder()
          .setLabel('멤버 설정')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(`cdec.${uuid}.config.member`),
      ),
    ],
  };

  return page;
};

export default MainPage;
