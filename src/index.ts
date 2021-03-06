// 모듈 로드
import { Message, Interaction, Guild } from 'discord.js';
import * as dotenv from 'dotenv';
import * as BotEvent from './Assets/BotEvent/BotEvent.js';
import { LoadConfig } from './Assets/Config/ConfigManager.js';
import { Connect } from './Assets/Database/DBManager.js';
import GuildAdd from './Assets/BotEvent/GuildAdd.js';

// .env 로딩
dotenv.config();
await LoadConfig();
await Connect();

const cli = BotEvent.client;

cli.once('ready', () => BotEvent.Start());

cli.on('messageCreate', async (msg: Message) => {
  BotEvent.MsgRecv(msg);
});

cli.on('interactionCreate', async (interaction: Interaction) => {
  BotEvent.InterAcRecv(interaction);
});

cli.on('guildCreate', async (guild: Guild) => {
  GuildAdd(guild);
});

cli.login(
  process.env.NODE_ENV === 'production'
    ? process.env.TOKEN
    : process.env.TESTTOKEN,
);
