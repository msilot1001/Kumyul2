import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class TicketClass {
  @prop({ required: true })
  category!: string;

  @prop({ required: true })
  title!: string;

  @prop()
  description?: string;

  @prop()
  buttontitle?: string;

  @prop({ required: true })
  targetid!: string;

  @prop({ required: true })
  shownroles!: string;
}

export const TicketModel = getModelForClass(TicketClass);
