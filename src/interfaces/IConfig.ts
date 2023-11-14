import {
  BitFieldResolvable,
  CacheWithLimitsOptions,
  GatewayIntentsString,
  Partials,
  SweeperOptions,
} from 'discord.js';

export default interface IConfig {
  client: {
    id: string;
    token: string;
    intents?: Array<BitFieldResolvable<GatewayIntentsString, number>>;
    partials?: string[];
    caches?: CacheWithLimitsOptions;
    sweepers?: SweeperOptions;
  };
  commands?: {
    enableMessageCommand?: boolean;
  };
}
