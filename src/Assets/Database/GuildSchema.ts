import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class GuildClass {
  @prop({ required: true, unique: true })
  id!: string;

  @prop({ required: true, default: 0 })
  warnlimit!: number;

  // json 저장
  @prop({ required: true, default: '{}' })
  customdetection!: string;
}

export const GuildModel = getModelForClass(GuildClass);
