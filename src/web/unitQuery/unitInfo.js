module.exports = {
  reqStats: [
    1,//health
    5,//speed
    6,//PD
    7,//SD
    8,//armor
    9,//Resistance
    10,//armorpen
    11,//resistance pen
    14,//P CC
    15,//S CC
    16,//CD
    17,//pot
    18,//ten
    27,//health steal
    28,//protection
  ],
  relicStats: {
    '37':{
      id: 37,
      baseId: 52,
      base: 0,
      nameKey: 'Accuracy'
    },
    '39':{
      id: 39,
      baseId: 35,
      base: 0,
      nameKey: 'Crit Avoidance'
    },
    '12':{
      id: 12,
      baseId: 12,
      base: 0.02,
      nameKey: 'Evasion'
    }
  },
  gearColors: [
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "white",
    "#9241FF",//g7
    "#9241FF",//g8
    "#9241FF",//g9
    "#9241FF",//g10
    "#9241FF",//g11
    "#FFD036",//g12
    "#FF0F0D"//g13
  ],
  pct:[
    false,//"None",
    false,//"Health",
    false,//"Strength",
    false,//"Agility",
    false,//"Intelligence",
    false,//"Speed",
    false,//"Physical Damage",
    false,//"Special Damage", //"UNIT_STAT_ABILITY_POWER",
    true,//"Armor", //"UNIT_STAT_ARMOR",
    true,//"Resistance", //"UNIT_STAT_SUPPRESSION",
    false,//"Armor Penetration", //"UNIT_STAT_ARMOR_PENETRATION",
    false,//"Resistance Penetration", //"UNIT_STAT_SUPPRESSION_PENETRATION",
    true,//"Dodge Rating", //"UNIT_STAT_DODGE_RATING",
    true,//"Deflection Rating", //"UNIT_STAT_DEFLECTION_RATING",
    false,//"Physical Critical Rating", //"UNIT_STAT_ATTACK_CRITICAL_RATING",
    false,//"Special Critical Rating", //"UNIT_STAT_ABILITY_CRITICAL_RATING",
    true,//"Critical Damage",
    true,//"Potency",
    true,//"Tenacity",
    true,//"UNIT_STAT_DODGE_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_DEFLECTION_PERCENT_ADDITIVE",
    true,//"Physical Critical Chance", //"UNIT_STAT_ATTACK_CRITICAL_PERCENT_ADDITIVE",
    true,//"Special Critical Chance", //"UNIT_STAT_ABILITY_CRITICAL_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_ARMOR_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_SUPPRESSION_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_ARMOR_PENETRATION_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_SUPPRESSION_PENETRATION_PERCENT_ADDITIVE",
    true,//"Health Steal",//"UNIT_STAT_HEALTH_STEAL",
    false,//"Protection",
    true,//"UNIT_STAT_SHIELD_PENETRATION",
    true,//"UNIT_STAT_HEALTH_REGEN",
    true,//"UNIT_STAT_ATTACK_DAMAGE_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_ABILITY_POWER_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_DODGE_NEGATE_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_DEFLECTION_NEGATE_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_ATTACK_CRITICAL_NEGATE_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_ABILITY_CRITICAL_NEGATE_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_DODGE_NEGATE_RATING",
    true,//"UNIT_STAT_DEFLECTION_NEGATE_RATING",
    true,//"UNIT_STAT_ATTACK_CRITICAL_NEGATE_RATING",
    true,//"UNIT_STAT_ABILITY_CRITICAL_NEGATE_RATING",
    false,//"Offense",
    false,//"Defense",
    true,//"UNIT_STAT_DEFENSE_PENETRATION",
    true,//"UNIT_STAT_EVASION_RATING",
    true,//"UNIT_STAT_CRITICAL_RATING",
    true,//"UNIT_STAT_EVASION_NEGATE_RATING",
    true,//"UNIT_STAT_CRITICAL_NEGATE_RATING",
    true,//"Offense %",
    true,//"Defense %",
    true,//"UNIT_STAT_DEFENSE_PENETRATION_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_EVASION_PERCENT_ADDITIVE",
    true,//"Accuracy",
    true,//"Critical Chance",
    true,//"Critical Avoidance",
    true,//"Health %",
    true,//"Protection %",
    true,//"Speed %",// "UNIT_STAT_SPEED_PERCENT_ADDITIVE",
    true,//"UNIT_STAT_COUNTER_ATTACK_RATING",
    true,//"UNIT_STAT_TAUNT"
  ]
}
