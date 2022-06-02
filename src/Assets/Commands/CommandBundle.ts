import ICommand from '../Interfaces/ICommand.js';
import Ban from './Ban.js';
import Help from './Help.js';
import Kick from './Kick.js';
import ValueCheck from './ValueCheck.js';
import ValueSet from './ValueSet.js';
import Vote from './Vote.js';
import WarnAdd from './WarnAdd.js';
import WarnCheck from './WarnCheck.js';
import WarnRemove from './WarnRemove.js';
import WarnReset from './WarnReset.js';
import WarnSet from './WarnSet.js';

const CommandBundle: ICommand[] = [
  Ban,
  Help,
  Kick,
  ValueCheck,
  ValueSet,
  Vote,
  WarnAdd,
  WarnCheck,
  WarnRemove,
  WarnReset,
  WarnSet,
];

export default CommandBundle;
