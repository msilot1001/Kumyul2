// 모듈 로드
import { Message, Interaction } from 'discord.js';
import * as dotenv from 'dotenv';
import * as BotEvent from './Assets/BotEvent/BotEvent.js';
import { LoadConfig } from './Assets/Config/ConfigManager.js';

// .env 로딩
dotenv.config();
await LoadConfig();

BotEvent.client.once('ready', () => BotEvent.Start());

BotEvent.client.on('messageCreate', async (msg: Message) => {
  BotEvent.MsgRecv(msg);
});

BotEvent.client.on('interactionCreate', async (interaction: Interaction) => {
  BotEvent.InterAcRecv(interaction);
});

BotEvent.client.login(process.env.TESTTOKEN);
