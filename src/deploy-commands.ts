import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import * as dotenv from 'dotenv';
import CommandBundle from './Assets/Commands/CommandBundle.js';
import logger from './Assets/Utils/Logger.js';

dotenv.config();

const commandArray = new Array<SlashCommandBuilder>();

CommandBundle.forEach(value => {
  commandArray.push(value.Builder);
});

if (process.env.TESTTOKEN !== undefined && process.env.CLIENTID !== undefined) {
  logger.info(
    `TOKEN: ${process.env.TESTTOKEN}, CLIENTID: ${process.env.CLIENTID}`,
  );

  const rest = new REST({ version: '10' }).setToken(process.env.TESTTOKEN);

  rest
    .put(Routes.applicationCommands(process.env.CLIENTID), {
      body: commandArray,
    })
    .then(() =>
      logger.info(
        `Successfully registered application commands. : ${commandArray}`,
      ),
    )
    .catch(err => logger.error(err));
} else {
  logger.error('Env Value undefined');
}
