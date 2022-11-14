import { BaseInteraction, Message, ChannelType } from 'discord.js';
import { inspect } from 'util';
import ConfigPage from '../Interfaces/IConfigPage.js';
import { InOutPage } from './index.js';
import logger from '../Utils/Logger.js';
import { GuildModel } from '../Database/GuildSchema.js';

const InOutMsgChannelConfig = (
  interaction: BaseInteraction,
  uuid: string,
): Promise<
  (interaction1: BaseInteraction, uuid1: string) => Promise<ConfigPage>
> =>
  new Promise<
    (interaction2: BaseInteraction, uuid2: string) => Promise<ConfigPage>
  >(async (resolve, reject) => {
    const parentPage = InOutPage;

    const filter = (msg: Message) => msg.author.id === interaction.user.id;

    const collector = interaction.channel?.createMessageCollector({
      filter,
      time: 60000,
    });

    const infoMsg = await interaction.channel?.send(
      '> 제한시간 60초 안에 입/퇴장 메세지 전송 채널으로 설정할 채널을 멘션해주세요. 입력 취소는 `ㅁ취소`를 입력하세요.',
    );

    collector!.on('collect', async (msg: Message) => {
      if (msg.content === 'ㅁ취소') {
        collector!.stop();

        // 부모페이지 전송
        if (infoMsg) {
          await infoMsg.delete();

          resolve(parentPage);
        }
      } else if (msg.content.startsWith('<#')) {
        const channelId = msg.content.substring(2, msg.content.length - 1);

        const channel = await msg.guild?.channels.fetch(channelId);

        if (!channel) {
          msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
        } else if (!(channel?.type === ChannelType.GuildText)) {
          msg.channel.send('텍스트 채널을 선택해주세요! 다시 시도해주세요!');
        } else {
          collector?.stop();
          if (infoMsg) await infoMsg.delete();

          await GuildModel.updateOne(
            { id: msg.guild!.id },
            { inoutmsgchannel: channelId },
          );

          await msg.channel.send({
            content: `성공적으로 입/퇴장 메세지 전송 채널을 <#${channel.id}>으로 바꿨어요!`,
          });

          // 부모페이지 전송
          resolve(parentPage);
        }
      } else {
        msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
      }
    });
  });

export default InOutMsgChannelConfig;
