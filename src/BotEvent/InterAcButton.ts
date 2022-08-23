import {
  ButtonInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from 'discord.js';
import { url } from '../Config/EmbedConfig.js';
import { VoteModel } from '../Database/VoteSchema.js';
import logger from '../Utils/Logger.js';

async function InterAcButton(interaction: ButtonInteraction) {
  if (!interaction.customId.startsWith('cdvo.')) return;

  const [id, type] = interaction.customId.substring(5).split('_');

  try {
    // db 조회
    const res = await VoteModel.findOne({ id });

    if (!res) return;

    // value
    let embed: MessageEmbed;

    const color = '#46b950';

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`cdvo.${id}_agree`)
        .setLabel('👍')
        .setStyle('SUCCESS'),
      new MessageButton()
        .setCustomId(`cdvo.${id}_disagree`)
        .setLabel('👎')
        .setStyle('DANGER'),
      new MessageButton()
        .setCustomId(`cdvo.${id}_lock`)
        .setLabel('🔒')
        .setStyle('SECONDARY'),
    );

    // 락 버튼
    if (type === 'lock') {
      if (res.maker !== interaction.user.id) {
        interaction.reply({
          content: '투표의 생성자만 투표를 종료할 수 있어요!',
          ephemeral: true,
        });

        return;
      }

      await VoteModel.deleteOne({ id });

      embed = new MessageEmbed()
        .setColor('#5f7b9b')
        .setAuthor({ name: '시덱이', iconURL: url })
        .setTitle(`[종료됨] ${res.topic}`)
        .setDescription(res.description || '새 투표에요!')
        .addFields(
          { name: '찬성', value: `${res.agree}`, inline: true },
          { name: '반대', value: `${res.disagree}`, inline: true },
        )
        .setFooter({
          text: `${res.makername}님이 시작했어요!`,
        });

      interaction.channel?.messages.fetch(res.msgid).then(msg => {
        msg.edit({ embeds: [embed], components: [] });
      });

      interaction.reply({
        content: '성공적으로 투표를 반영했어요!',
        ephemeral: true,
      });

      return;
    }

    // #region 이미 투표했는지 확인

    if (res.uservoted.has(interaction.user.id)) {
      const voted = res.uservoted.get(interaction.user.id);

      // agree 눌렀을 경우
      if (voted) res.agree -= 1;
      // disagree 경우
      if (!voted) res.disagree -= 1;
    }

    // #endregion

    // #region 값 변화시키기
    if (type === 'agree') {
      res.agree += 1;

      res.save();

      res.uservoted.set(interaction.user.id, true);
    }
    if (type === 'disagree') {
      res.disagree += 1;

      res.save();

      res.uservoted.set(interaction.user.id, false);
    }

    embed = new MessageEmbed()
      .setColor(color)
      .setAuthor({ name: '시덱이', iconURL: url })
      .setTitle(res.topic)
      .setDescription(res.description || '새 투표에요!')
      .addFields(
        { name: '찬성', value: `${res.agree}`, inline: true },
        { name: '반대', value: `${res.disagree}`, inline: true },
      )
      .setFooter({
        text: `${res.makername}님이 시작했어요!`,
      });

    // #endregion

    interaction.channel?.messages.fetch(res.msgid).then(msg => {
      msg.edit({ embeds: [embed], components: [buttons] });
    });

    interaction.reply({
      content: '성공적으로 투표를 반영했어요!',
      ephemeral: true,
    });
  } catch (err) {
    logger.error(err);
  }
}

export default InterAcButton;
