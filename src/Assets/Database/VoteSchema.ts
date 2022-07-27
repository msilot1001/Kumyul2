import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class VoteClass {}

export const VoteModel = getModelForClass(VoteClass);
