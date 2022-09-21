import { ChannelType, CommandInteraction, Message } from 'discord.js';
import { GuildModel } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';
import OrdinaryPage from './OrdinaryPage.js';

const SysChConfig = (
  interaction: CommandInteraction,
  uuid: string,
): Promise<
  (interaction1: CommandInteraction, uuid1: string) => Promise<ConfigPage>
> =>
  new Promise<
    (interaction2: CommandInteraction, uuid2: string) => Promise<ConfigPage>
  >(async (resolve, reject) => {
    const parentPage = OrdinaryPage;

    const filter = (msg: Message) => msg.author.id === interaction.user.id;

    const collector = interaction.channel?.createMessageCollector({
      filter,
      time: 60000,
    });

    const infoMsg = await interaction.channel?.send(
      '> 제한시간 60초 안에 시스템 공지 채널로 설정할 채널을 멘션해주세요. 입력 취소는 `ㅁ취소`를 입력하세요.',
    );

    collector!.on('collect', async (msg: Message) => {
      if (msg.content === 'ㅁ취소') {
        // 부모페이지 전송
        if (infoMsg) {
          await infoMsg.delete();

          resolve(parentPage);
        }
      } else if (msg.content.startsWith('<#')) {
        const channelId = msg.content.substring(2, msg.content.length - 1);

        const channel = await msg.guild?.channels.fetch(channelId);

        if (!channel)
          msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
        else if (!(channel?.type === ChannelType.GuildText))
          msg.channel.send('텍스트 채널을 선택해주세요! 다시 시도해주세요!');
        else {
          await GuildModel.updateOne(
            { id: msg.guild!.id },
            { sysnoticechannel: channelId },
          );

          if (infoMsg) await infoMsg.delete();

          await msg.channel.send(
            `성공적으로 시스템 메세지 공지 채널을 <#${channel.id}>으로 바꿨어요!`,
          );

          collector?.stop();

          // 부모페이지 전송
          resolve(parentPage);
        }
      } else {
        msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
      }
    });
  });

export default SysChConfig;
