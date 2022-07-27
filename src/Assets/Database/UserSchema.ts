import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

export class UserClass {
  @prop({ required: true, unique: true })
  id!: string;

  /* json
    {
      {
        guild_id: '...',
        warn: 123
      },
      {}, ...
    }
   */
  @prop({ required: true, default: 0 })
  warn!: number;
}

export const UserModel = getModelForClass(UserClass);
