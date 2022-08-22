import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class TicketClass {}

export const TicketModel = getModelForClass(TicketClass);
