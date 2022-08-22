import BotConfigFile from './BotConfig.js';
import { ConfigEnum } from '../Enums/Enums.js';
import IBotConfig from '../Interfaces/IBotConfig.js';

export class UnvalidBotConfigError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'UnvalidBotConfigError';
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnvalidBotConfigError.prototype);
  }
}

export class PropertyRequiredError extends UnvalidBotConfigError {
  public property: string;

  constructor(property: string) {
    super(`Property undefined or empty: ${property}`);
    this.name = 'PropertyRequiredError';
    this.property = property;
  }
}

// BotConfig.ts 로드
export const LoadConfig = (): Promise<IBotConfig> =>
  new Promise<IBotConfig>((resolve, reject) => {
    if (
      BotConfigFile.enableMessageCommand === undefined ||
      BotConfigFile.enableMessageCommand === null
    ) {
      reject(new PropertyRequiredError('enableMessageCommand'));
    }

    resolve(BotConfigFile);
  });

export async function GetConfig(configvalue: ConfigEnum) {
  const config = await LoadConfig();

  switch (configvalue) {
    case 1:
      return config.enableMessageCommand;
      break;
    default:
      break;
  }
}
