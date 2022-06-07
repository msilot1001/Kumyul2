import { BaseCommandInteraction } from 'discord.js';
import CommandBundle from '../Commands/CommandBundle.js';
import logger from '../Utils/Logger.js';

async function InterAcCommand(interaction: BaseCommandInteraction) {
  // 커맨드번들에서 찾기
  const command = CommandBundle.find(
    value => value.Builder.name === interaction.commandName,
  );

  // 없으면 리턴
  if (!command) {
    // eslint-disable-next-line no-useless-return
    return;
  }

  // 있으면 실행
  command.SlashExecute(interaction);
}

export default InterAcCommand;
