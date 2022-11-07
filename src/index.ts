// 모듈 로드
import { Message, Interaction, Guild, GuildMember } from 'discord.js';
import * as dotenv from 'dotenv';
import {
  client,
  Start,
  MsgRecv,
  InterAcRecv,
  GuildAdd,
  GuildMemberAdd,
} from './BotEvent/index.js';
import { LoadConfig } from './Config/ConfigManager.js';
import { Connect } from './Database/DBManager.js';

// .env 로딩
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

LoadConfig().then(async () => {
  await Connect();

  client.once('ready', () => Start());

  client.on('messageCreate', async (msg: Message) => {
    MsgRecv(msg);
  });

  client.on('interactionCreate', async (interaction: Interaction) => {
    InterAcRecv(interaction);
  });

  client.on('guildCreate', async (guild: Guild) => {
    GuildAdd(guild);
  });

  client.on('guildMemberAdd', async (member: GuildMember) => {
    GuildMemberAdd(member);
  });

  client.login(
    process.env.NODE_ENV === 'production'
      ? process.env.TOKEN
      : process.env.TESTTOKEN,
  );
});
