import UnixTimestamp from './UnixTimestamp.js';

export interface Values {
  usertag: string;
  username: string;
  userid: string;
  guildname: string;
  guildid: string;
  membercount: string;
}
export function ParseInOutMsg(string: string, values: Values) {
  let ctx = string;

  ctx = ctx.replace(/(usertag|\${usertag})/gm, values.usertag);
  ctx = ctx.replace(/(username|\${username})/gm, values.username);
  ctx = ctx.replace(/(userid|\${userid})/gm, values.userid);
  ctx = ctx.replace(/(guildname|\${guildname})/gm, values.guildname);
  ctx = ctx.replace(/(guildid|\${guildid})/gm, values.guildid);
  ctx = ctx.replace(/(membercount|\${membercount})/gm, values.membercount);
  ctx = ctx.replace(
    /(timestamp_t|\${timestamp_t})/gm,
    `<t:${UnixTimestamp()}:t>`,
  );
  ctx = ctx.replace(
    /(timestamp_T|\${timestamp_T})/gm,
    `<t:${UnixTimestamp()}:T>`,
  );
  ctx = ctx.replace(
    /(timestamp_d|\${timestamp_d})/gm,
    `<t:${UnixTimestamp()}:d>`,
  );
  ctx = ctx.replace(
    /(timestamp_D|\${timestamp_D})/gm,
    `<t:${UnixTimestamp()}:D>`,
  );
  ctx = ctx.replace(
    /(timestamp_f|\${timestamp_f})/gm,
    `<t:${UnixTimestamp()}:f>`,
  );
  ctx = ctx.replace(
    /(timestamp_F|\${timestamp_F})/gm,
    `<t:${UnixTimestamp()}:F>`,
  );

  return ctx;
}
