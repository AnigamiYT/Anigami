module.exports = {
  name: 'help',
  description: 'HELP',
  usage: 'PREFIX + HELP',
  args: true,
  dmAllow: true,
  channels: [],
  execute(message) {
    try {
      message.channel.send('Mihoyo Bot Commands:\n\n``profile``- displays your information\n``resin`` - check your resin\n``primogems`` - check your amount of primogems\n``pulls`` - display your remaining number of pulls\n\n``monthly`` - claim your monthly (__30000__ Primogems a month)\n``weekly`` - claim your weekly (__10000__ Primogems a week)\n``daily`` - claim your daily (__1600__ Primogems a day)\n\n``characters`` - check your characters\n``characters`` <character_name> - check stats of character\n``party`` - check your party\n``party`` <character_1> ... <character_6> - set your party (THIS IS CASE SENSITIVE. CAPITALIZE THE FIRST LETTER OF CHARACTER)\n\n``weapons`` - check your weapons\n``weapons`` <weapon_name>: check specific detail of your upgraded weapons\n``leyline outcrops`` <difficulty> __1-999__ - Farm Mora with your party, but also consumes ``10`` of your current resin.\n\n``singlepull`` - 1x pull\n\n``multipull`` - 10x pull\n``whalepull`` - 90x pull\n\n``flip`` <amount> - Gamble your primogems. Careful, Paimon will **eat** your primogems if you gamble too much.\n\n``upgrade`` <weapon_1> <weapon_2>\n\n> Upgrades **weapon_1** using all instances of **weapon_2**.\n\n``upgrade`` <weapon_name> <weapon_number> __SINGLE__ <material_name> <quantity>\n> UPGRADES **weapon_name** USING **material_name**. Materials included using this method are only rank 1 level 1 weapons.\n> You can check the weapon number of your weapon using ``weapons`` <weapon_name>\n\n``upgrade`` <weapon_name> <weapon_number> __MULTI__ <material_name> <material_number>\n> UPGRADES **weapon_name** USING **material_name**. Materials included using this method can be any weapon, including upgraded ones.\n> You can check the weapon/material number of your weapon using ``weapons`` <weapon_name>\n\n``equip`` <weapon> <character>');
    } catch (err) { console.log(err); }
  },
};
