import {
  BaseCommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from 'discord.js';
import { color, url } from '../Config/EmbedConfig.js';
import { GuildModel } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';

const OrdinaryPage = async (
  interaction: BaseCommandInteraction,
  uuid: string,
) => {
  const guildData = await GuildModel.findOne({ id: interaction.guild!.id });

  let sysnoticechannel: string | undefined = guildData?.sysnoticechannel;

  if (guildData?.sysnoticechannel) {
    interaction
      .guild!.channels.fetch(guildData?.sysnoticechannel)
      .then(querychannel => {
        // 없으면
        if (!querychannel) {
          // 채널 가져오기
          interaction.guild!.channels.fetch().then(channels => {
            if (channels.size === 0) return;

            let isended = false;

            channels.forEach(channel => {
              if (isended) return;
              if (channel.isText()) {
                isended = true;
                sysnoticechannel = channel.id;
              }
            });
          });
        } else {
          sysnoticechannel = querychannel.id;
        }
      });
  } else {
    interaction.guild!.channels.fetch().then(channels => {
      if (channels.size === 0) return;

      let isended = false;

      channels.forEach(channel => {
        if (isended) return;
        if (channel.isText()) {
          isended = true;
          sysnoticechannel = channel.id;
        }
      });
    });
  }

  const page: ConfigPage = {
    name: 'ordinary',
    embed: new MessageEmbed()
      .setColor(color)
      .setAuthor({ name: '시덱이', iconURL: url })
      .setTitle('일반 설정')
      .setDescription('일반적인 설정 목록입니다.')
      .addFields({
        name: '시스템 메세지 공지 채널',
        value: sysnoticechannel ? `<#${sysnoticechannel}>` : '미정',
      }),
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('시스템 공지 채널 설정')
          .setStyle('PRIMARY')
          .setCustomId(`cdec.${uuid}.config.execute.syschconfig`),
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

export default OrdinaryPage;
