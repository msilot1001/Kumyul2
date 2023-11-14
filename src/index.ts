// 모듈 로드
import {
  Message,
  Interaction,
  Guild,
  GuildMember,
  PartialGuildMember,
  Partials,
  Options,
} from 'discord.js';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
// import {
//   Start,
//   MsgRecv,
//   InterAcRecv,
//   GuildAdd,
//   GuildMemberAdd,
//   GuildMemberRemove,
// } from './EventHandler/index.js';

import { Connect } from './Database/DBManager.js';
import logger from './utils/logger.js';
import { CdecClient } from './eventHandlers/MainHandler.ts';
import Config from './config/index.js';
import Bot from './core/bot.js';

// .env 로딩
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const config = await new Config().LoadConfig();

// Bot Entry Point
async function start(): Promise<void> {
  const client: CdecClient = new CdecClient({
    intents: config.client?.intents ?? 0,
    partials: config.client?.partials
      ? config.client.partials.map(
          partials => Partials[partials as keyof typeof Partials],
        )
      : undefined,
    makeCache: Options.cacheWithLimits({
      ...Options.DefaultMakeCacheSettings,
      ...config.client?.caches,
    }),
    sweepers: {
      ...Options.DefaultSweeperSettings,
      messages: {
        interval: 3600, // 1 hours
        lifetime: 1800, // 30 min
      },
      users: {
        interval: 3600, // 1 hour
        filter: () => user => user.bot && user.id !== client.user?.id, // exclude bot
      },
    },
  });

  const bot = new Bot(config, client);

  await bot.start();
}

start();
// LoadConfig().then(async () => {
//   await Connect();

//   client.once('ready', () => Start());

//   client.on('messageCreate', (msg: Message) => {
//     MsgRecv(msg);
//   });

//   client.on('interactionCreate', (interaction: Interaction) => {
//     InterAcRecv(interaction);
//   });

//   client.on('guildCreate', (guild: Guild) => {
//     GuildAdd(guild);
//   });

//   client.on('guildMemberAdd', (member: GuildMember) => {
//     GuildMemberAdd(member);
//   });

//   client.on('guildMemberRemove', (member: GuildMember | PartialGuildMember) => {
//     logger.info('guild member remove');
//     GuildMemberRemove(member);
//   });

//   client.login(
//     process.env.NODE_ENV === 'production'
//       ? process.env.TOKEN
//       : process.env.TESTTOKEN,
//   );
// });
