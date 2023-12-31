'use strict'
const GetHTML = require('webimg').datacron
module.exports = async(obj = {})=>{
  try{
    let opt = obj?.data?.options || [], msg2send = {content: 'No active Datacrons in the db'}, allyCode, pObj, pDatacron, allyObj, webData, webHtml, webImg
    let datacronSet = await HP.GetOptValue(opt, 'datacron-set', 'all')
    let datacronLvl = await HP.GetOptValue(opt, 'level', 3)
    if(+datacronLvl >= 0){
      if(datacronLvl > 9 ) datacronLvl = 9
    }else{
      datacronLvl = 3
    }
    let datacronList = await mongo.aggregate('datacronList', {expirationTimeMs: {$gte: +(Date.now())}}, [{$sort: {_id: -1}}])
    if(datacronList?.length > 0){
      msg2send.content = 'You do not have discordId linked to allyCode'
      allyObj = await HP.GetPlayerAC(obj, opt)
    }
    if(allyObj && allyObj.allyCode) allyCode = allyObj.allyCode
    if(allyObj && allyObj.mentionError) msg2send.content = 'that user does not have allyCode linked to discordId'
    if(allyCode){
      msg2send.content = 'Error getting player data'
      pObj = await HP.FetchPlayer({allyCode: allyCode.toString()})
      if(pObj?.datacron) pDatacron = pObj.datacron
      if(pDatacron?.length > 0){
        msg2send.content = 'no datacrons that meet your search critera'
        if(datacronSet !== 'all') pDatacron = pDatacron.filter(x=>x?.templateId === datacronSet)
        if(datacronLvl >= 0) pDatacron = pDatacron.filter(x=>+(x?.affix?.length) >= +datacronLvl)
      }
    }
    if(pDatacron?.length > 0){
      msg2send.content = 'Error getting player datacrons'
      webData = {dcDef: {}, info: { name: pObj.name, updated: pObj.updated, set: datacronSet, level: datacronLvl }, data: [] }
      for(let i in pDatacron){
        if(!webData.dcDef[pDatacron[i].templateId]) webData.dcDef[pDatacron[i].templateId] = datacronList.find(x=>x.id === pDatacron[i].templateId)
        pDatacron[i].level = +pDatacron[i].affix?.length || 0
        webData.data.push(pDatacron[i])
      }
    }
    if(webData?.data?.length > 0){
      msg2send.content = 'Error getting html'
      webHtml = await GetHTML(webData)
    }
    if(webHtml){
      msg2send.content = 'Error getting image'
      webImg = await HP.GetImg(webHtml, obj.id, 1400, false)
    }
    if(webImg){
      msg2send.content = null
      msg2send.file = webImg
      msg2send.fileName = pObj.name+'-datacron'+'.png'
    }
    await HP.ReplyMsg(obj, msg2send)
  }catch(e){
    console.error(e);
    HP.ReplyError(obj)
  }
}
