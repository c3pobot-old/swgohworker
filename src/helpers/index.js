'use strict'
const discordhelper = require('discordhelper')
const swgohhelper = require('swgohhelper')
const Cmds = {...discordhelper,...swgohhelper}

Cmds.AdminNotAuth = require('./adminNotAuth')
Cmds.AddShardCmds = require('./addShardCmds')
Cmds.BotRequest = require('botrequest')
Cmds.CheckBotOwner = require('./checkBotOwner')
Cmds.CheckServerAdmin = require('./checkServerAdmin')
Cmds.CheckShardAdmin = require('./checkShardAdmin')
Cmds.CheckSuperAdmin = require('./checkSuperAdmin')
Cmds.CreateIntialMessage = require('./createIntialMessage')
Cmds.debugMsg = require('./debugMsg')
Cmds.EditUnit = require('./editUnit')
Cmds.FetchGuild = require('./fetchGuild')
Cmds.FetchPlayer = require('./fetchPlayer')
Cmds.GetFakeUnit = require('./getFakeUnit')
Cmds.GetGuildName = require('./getGuildName')
Cmds.GetGuildMemberName = require('./getGuildMemberName')
Cmds.GetImg = require('./getScreenShot')
Cmds.JoinImages = require('./joinImages')
Cmds.ModifyUnit = require('./modifyUnit')
Cmds.GetOffenseStat = require('./getOffenseStat')
Cmds.GetPlayerAC = require('./getPlayerAC')
Cmds.GetPlayerId = require('./getPlayerId')
Cmds.GetRole = require('./getRole')
Cmds.GetScreenShot = require('./getScreenShot')
Cmds.GetShard = require('./getShard')
Cmds.GetTopUnits = require('./getTopUnits')
Cmds.GetWebUnitStats = require('./getWebUnitStats')
Cmds.RemoveShardCmds = require('./removeShardCmds')
Cmds.ReplyTokenError = require('./replyTokenError')
Cmds.ShowRotationSchedule = require('./showRotationSchedule')
module.exports = Cmds