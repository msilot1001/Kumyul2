import ICommand from '../Interfaces/ICommand.js';
import Ban from './Ban.js';
import Help from './Help.js';
import Kick from './Kick.js';
import LimitCheck from './LimitCheck.js';
import LimitSet from './LimitSet.js';
import Vote from './Vote.js';
import WarnAdd from './WarnAdd.js';
import WarnCheck from './WarnCheck.js';
import WarnRemove from './WarnRemove.js';
import WarnReset from './WarnReset.js';
import WarnSet from './WarnSet.js';
import ServerConfig from './ServerConfig.js';

const CommandBundle: ICommand[] = [
  Ban,
  Help,
  Kick,
  LimitCheck,
  LimitSet,
  Vote,
  WarnAdd,
  WarnCheck,
  WarnRemove,
  WarnReset,
  WarnSet,
  ServerConfig,
];

export default CommandBundle;
