import { BaseCommandInteraction, Message } from 'discord.js';
import { GuildModel } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';
import logger from '../Utils/Logger.js';
import OrdinaryPage from './OrdinaryPage.js';

const SysChConfig = (
  interaction: BaseCommandInteraction,
  uuid: string,
): Promise<
  (interaction1: BaseCommandInteraction, uuid1: string) => Promise<ConfigPage>
> =>
  new Promise<
    (interaction2: BaseCommandInteraction, uuid2: string) => Promise<ConfigPage>
  >(async (resolve, reject) => {
    const parentPage = OrdinaryPage;

    const filter = (msg: Message) => msg.author.id === interaction.user.id;

    const collector = interaction.channel?.createMessageCollector({
      filter,
      time: 60000,
    });

    const infomsg = await interaction.channel?.send(
      '> 제한시간 60초 안에 시스템 공지 채널로 설정할 채널을 멘션해주세요. 입력 취소는 `ㅁ취소`를 입력하세요.',
    );

    collector!.on('collect', async (msg: Message) => {
      if (msg.content === 'ㅁ취소') {
        // 메인페이지 전송
        if (infomsg) {
          await infomsg.delete();

          resolve(OrdinaryPage);
        }
      } else if (msg.content.startsWith('<#')) {
        const channelid = msg.content.substring(2, msg.content.length - 1);

        const channel = await msg.guild?.channels.fetch(channelid);

        if (!channel)
          msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
        else if (!channel?.isText)
          msg.channel.send('텍스트 채널을 선택해주세요! 다시 시도해주세요!');
        else {
          await GuildModel.updateOne(
            { id: msg.guild!.id },
            { sysnoticechannel: channelid },
          );

          await msg.channel.send(
            `성공적으로 시스템 메세지 공지 채널을 <#${channel.id}>으로 바꿨어요!`,
          );

          if (infomsg) await infomsg.delete();

          collector?.stop();

          // 메인페이지 전송
          resolve(parentPage);
        }
      } else {
        msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
      }
    });
  });

export default SysChConfig;
