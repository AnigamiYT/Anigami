/* eslint-disable camelcase */

const channel_blacklist = require('./channel_blacklist.js');
const channel_whitelist = require('./channel_whitelist.js');
const generate_character_constants = require('./generate_character_constants.js');
const generate_weapon_constants = require('./generate_weapon_constants.js');
const give_all_primogems = require('./give_all_primogems.js');
const give_character = require('./give_character.js');
const give_primogems = require('./give_primogems.js');
const give_weapon = require('./give_weapon.js');
const write_to_database = require('./write_to_database.js');

module.exports = {
  channel_blacklist,
  channel_whitelist,
  generate_character_constants,
  generate_weapon_constants,
  give_all_primogems,
  give_character,
  give_primogems,
  give_weapon,
  write_to_database,
};
