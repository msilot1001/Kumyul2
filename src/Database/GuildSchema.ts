import typegoose, { Ref } from '@typegoose/typegoose';
import { TicketClass } from './TicketSchema.js';

const { prop, getModelForClass } = typegoose;

export class GuildClass {
  @prop({ required: true, unique: true })
  id!: string;

  @prop({ required: true, default: 0 })
  warnlimit!: number;

  // JSON
  @prop({ required: true, default: '[]' })
  userwarns!: string;

  // json 저장
  @prop({ required: true, default: '[]' })
  customdetection!: string;

  // 시스템 공지 채널
  @prop()
  sysnoticechannel?: string;

  // 공지 채널
  @prop()
  noticechannel?: string;

  // 환영 메세지
  @prop()
  greetmsg?: string;

  @prop()
  exitmsg?: string;

  @prop({ ref: () => TicketClass })
  ticketlist?: Ref<TicketClass>;

  // (string, xp) 형식
  @prop()
  userlevels?: Map<string, number>;

  @prop()
  inmsg?: string;

  @prop()
  outmsg?: string;

  @prop()
  userautorole?: string;

  @prop()
  botautorole?: string;
}

export const GuildModel = getModelForClass(GuildClass);
