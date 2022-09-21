import { CommandInteraction } from 'discord.js';
import { GuildClass } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';
import InOutPage from './InOutPage.js';

const InMsgConfig = (
  interaction: CommandInteraction,
  uuid: string,
): Promise<
  (interaction1: CommandInteraction, uuid1: string) => Promise<ConfigPage>
> =>
  new Promise<
    (interaction2: CommandInteraction, uuid2: string) => Promise<ConfigPage>
  >(async (resolve, reject) => {
    const parentPage = InOutPage;
  });

export default InMsgConfig;
