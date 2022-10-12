import { BaseInteraction } from 'discord.js';
import { GuildClass } from '../Database/GuildSchema.js';
import ConfigPage from '../Interfaces/IConfigPage.js';

const OutMsgConfig = (
  interaction: BaseInteraction,
  uuid: string,
): Promise<
  (interaction1: BaseInteraction, uuid1: string) => Promise<ConfigPage>
> =>
  new Promise<
    (interaction2: BaseInteraction, uuid2: string) => Promise<ConfigPage>
  >(async (resolve, reject) => {});

export default OutMsgConfig;
