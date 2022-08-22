/* eslint-disable no-use-before-define */
// #region import/declare
// 임포트
import {
  Client,
  Intents,
  Message,
  ActivityOptions,
  Interaction,
} from 'discord.js';
import logger from '../Utils/Logger.js';
import InterAcRecvFunc from './InterAcRecv.js';
import MsgRecvFunc from './MsgRecv.js';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// #endregion

// #region 봇 이벤트 함수

/**
 * 봇 스타트 함수
 */
export async function Start() {
  logger.info(`\n${client.user?.tag} (검열봇 시덱이) 이 준비되었습니다!`);

  let latency = client.ws.ping;

  logger.info(`현재 연결된 클라이언트의 핑은 ${latency}ms 입니다.`);

  // 유동 상테메세지
  let activitylist: ActivityOptions[] = [];

  setInterval(() => {
    // 핑 갱신하기
    latency = client.ws.ping;

    // List 갱신
    activitylist = [
      { name: '욕설', type: 'LISTENING' },
      {
        name: '닝겐들 명령',
        type: 'LISTENING',
      },
      { name: '너님의 명령', type: 'LISTENING' },
      { name: '욕설을 검열', type: 'LISTENING' },
      { name: '시덱인 귀여웡 이라고', type: 'LISTENING' },
      { name: '당신네 서버에서 검열놀이', type: 'LISTENING' },
      { name: `${client.guilds.cache.size}`, type: 'PLAYING' },
      {
        name: `${client.guilds.cache.reduce(
          (a, g) => a + g.memberCount,
          0,
        )}명의 닝겐들과 함께`,
        type: 'PLAYING',
      },
    ];

    // 등록
    client.user?.setActivity(
      activitylist[Math.floor(Math.random() * activitylist.length)],
    );
  }, 5000);
}

/**
 * 메세지 감지 함수임
 * @param msg 메세지
 */
export async function MsgRecv(msg: Message) {
  MsgRecvFunc(msg);
}

export async function InterAcRecv(interaction: Interaction) {
  InterAcRecvFunc(interaction);
}

/**
 * 에러가 나면 에라났다고 reply 라도 하라고 착한 마실롯이 만든 함수
 * @param msg 메세지
 * @param err 에러
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function ErrorInMsgProcess(msg: Message, err: any) {
  msg.reply(`Error Occured While Progress \n Error: ${err}`);
}

// #endregion
