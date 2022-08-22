import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class VoteClass {
  @prop({ required: true })
  id!: string;

  @prop({ required: true })
  topic!: string;

  @prop({ required: true })
  msgid!: string;

  @prop()
  description?: string;

  @prop({ required: true, default: 0 })
  agree!: number;

  @prop({ required: true, default: 0 })
  disagree!: number;

  // true => agree
  // false => disagree
  @prop({ required: true })
  uservoted!: Map<string, boolean>;
}

export const VoteModel = getModelForClass(VoteClass);
