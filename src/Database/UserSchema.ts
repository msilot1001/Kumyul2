import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class UserClass {
  @prop({ required: true, unique: true })
  id!: string;
}

export const UserModel = getModelForClass(UserClass);
