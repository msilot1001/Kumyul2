import { BaseInteraction, Message } from 'discord.js';
import { GuildClass, GuildModel } from '../../Database/GuildSchema.js';
import ConfigPage from '../../interfaces/IConfigPage.js';
import { InOutPage } from './index.js';

const InOutUserRoleConfig = (
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
      '> 제한시간 60초 안에 자동으로 유저에게 부여할 역할을 멘션해주세요. 입력 취소는 `ㅁ취소`를 입력하세요.',
    );

    collector!.on('collect', async (msg: Message) => {
      if (msg.content === 'ㅁ취소') {
        // 부모 전송
        if (infoMsg) {
          await infoMsg.delete();

          resolve(parentPage);
        }
      } else if (msg.content.startsWith('<@&')) {
        const roleId = msg.content.substring(3, msg.content.length - 1);

        const role = await msg.guild?.roles.fetch(roleId);

        if (!role) msg.channel.send('입력이 잘못되었어요! 다시 시도해주세요!');
        else {
          await GuildModel.updateOne(
            { id: msg.guild!.id },
            { userautorole: role.id },
          );

          if (infoMsg) await infoMsg.delete();

          await msg.delete();

          await msg.channel.send(
            `성공적으로 자동으로 유저에게 부여할 역할을 <@&${role.id}>으로 바꿨어요!`,
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

export default InOutUserRoleConfig;
