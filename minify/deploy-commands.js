import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as dotenv from 'dotenv';
import CommandBundle from './Commands/CommandBundle.js';
import logger from './Utils/Logger.js';
dotenv.config();
const commandArray = new Array();
if (
  (CommandBundle.forEach(o => {
    commandArray.push(o.Builder);
  }),
  void 0 !== process.env.TESTTOKEN && void 0 !== process.env.CLIENTID)
) {
  logger.info(
    `TOKEN: ${process.env.TESTTOKEN}, CLIENTID: ` + process.env.CLIENTID,
  );
  const b = new REST({ version: '10' }).setToken(process.env.TESTTOKEN);
  b.put(Routes.applicationCommands(process.env.CLIENTID), {
    body: commandArray,
  })
    .then(() =>
      logger.info(
        'Successfully registered application commands. : ' + commandArray,
      ),
    )
    .catch(o => logger.error(o));
} else logger.error('Env Value undefined');

