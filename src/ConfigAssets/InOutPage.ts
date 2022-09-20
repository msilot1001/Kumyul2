import {
  BaseCommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Role,
} from 'discord.js';
import { color, url } from '../Config/EmbedConfig.js';
import { GuildClass, GuildModel } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';

const InOutPage = async (interaction: BaseCommandInteraction, uuid: string) => {
  const guildData = await GuildModel.findOne({ id: interaction.guild!.id });
  const userautorole = guildData?.userautorole;
  const botautorole = guildData?.botautorole;

  // eslint-disable-next-line one-var
  let userrole, botrole: Role | null | undefined;

  // 역할 불러오기
  if (userautorole) {
    userrole = await interaction.guild?.roles.fetch(userautorole);
  }

  if (botautorole) {
    botrole = await interaction.guild?.roles.fetch(botautorole);
  }

  const page: ConfigPage = {
    name: 'inout',
    embed: new MessageEmbed()
      .setColor(color)
      .setAuthor({ name: '시덱이', iconURL: url })
      .setTitle('입/퇴장 설정')
      .setDescription('입/퇴장 관련 설정 목록입니다.')
      .addFields(
        {
          name: '유저 자동 역할',
          value: userrole ? `<@&${userrole?.id}>` : '미정',
        },
        {
          name: '봇 자동 역할',
          value: botrole ? `<@&${botrole?.id}>` : '미정',
        },
        {
          name: '입장 메세지',
          value: guildData?.inmsg || '미정',
        },
        {
          name: '퇴장 메세지',
          value: guildData?.outmsg || '미정',
        },
      ),
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('유저 자동 역할 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.execute.userroleconfig`),
        new MessageButton()
          .setLabel('봇 자동 역할 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.execute.botroleconfig`),
        new MessageButton()
          .setLabel('입장 메세지 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.execute.inmsgconfig`),
        new MessageButton()
          .setLabel('퇴장 메세지 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.execute.outmsgconfig`),
      ),

      new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('뒤로가기')
          .setStyle('DANGER')
          .setCustomId(`cdec.${uuid}.config.main`),
      ),
    ],
  };

  return page;
};

export default InOutPage;