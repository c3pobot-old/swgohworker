'use strict'
const GetHTML = require('webimg').counter
module.exports = async(obj = {}, opt = [], mode = '5v5')=>{
  try{
    let msg2send = {content: 'you did not specify a valid unit'}, webImg, tempSquads, countSquads, squads = [], webData, defaultSettings, skip = 0, method = 'PATCH'
    let dObj = (await mongo.find('discordId', {_id: obj.member?.user?.id}, {settings: 1}))[0]
    if(dObj?.settings?.ga) defaultSettings = dObj.settings.ga
    let leader = await HP.GetOptValue(opt, 'leader')
    let season = await HP.GetOptValue(opt, 'season')
    let exclude_gl = await HP.GetOptValue(opt, 'exclude_gl')
    let sort = await HP.GetOptValue(opt, 'sort', defaultSettings?.sort || 'rate')
    let minBattles = await HP.GetOptValue(opt, 'battles', defaultSettings?.battles || 2)
    let battleLimit = await HP.GetOptValue(opt, 'limit', defaultSettings?.limit || 10)
    let league = await HP.GetOptValue(opt, 'league', 'KYBER')
    if(minBattles >= 0) minBattles = +minBattles
    if(battleLimit >= 0) battleLimit = +battleLimit
    if(battleLimit > 50) battleLimit = 50
    if(!season && botSettings['ga-'+mode]) season = botSettings['ga-'+mode]
    if(obj.confirm){
      method = 'POST'
      await HP.ReplyButton(obj, 'Getting '+battleLimit+' more ...')
      skip = +obj.confirm.skip
      countSquads = JSON.parse(JSON.stringify(obj.confirm))
      if(skip < 0) skip = 0
    }
    let info = { league: league, battles: minBattles, limit: battleLimit, exclude_gl: exclude_gl, leader: leader, units: [] }
    for(let i in opt){
      if(opt[i]?.name?.startsWith('unit')){
        let str
        let baseId = opt[i].value?.toString()?.toUpperCase()?.trim()
        if(baseId && unitList[baseId]){
          if(!str) str = ' with'
          str += ' '+unitList[baseId].name
          info.units.push(baseId)
        }
      }
    }
    if(leader && unitList[leader] && season){
      msg2send.content = 'No results found for **'+unitList[leader].name+'**'
      let pipeline = [], countPipeline = [], searchString = '^'+season+'-d'+leader+'-'
      if(info?.units?.length > 0){
        await info.units.sort()
        msg2send.content += ' with units'
        for(let i in info.units){
          searchString += '.*d'+info.units[i]+'-'
          msg2send.content += ' '+unitList[info.units[i]].name
        }
      }
      if(exclude_gl) msg2send.content += ' exclude_gl'
      pipeline.push({
        $project: {
          _id: 1,
          attackSquad: 1,
          defendSquad: 1,
          mode: 1,
          season: 1,
          total: 1,
          rate: 1
        }
      })
      countPipeline.push({
        $project: {
          _id: 1,
          total: 1,
          mode: 1,
          season: 1
        }
      })
      countPipeline.push({
        $group: {
            _id: '$season',
            mode: { $first: '$mode'},
            total: { $sum : '$total'}
        }
      })
      if(sort === 'rate'){
        pipeline.push({ $sort: { rate: -1 } })
      }else{
        pipeline.push({ $sort: { total: -1 } })
      }
      pipeline.push({ $skip: +skip})
      pipeline.push({ $limit: +battleLimit })
      const payload = {_id: {$regex: searchString}, total: {$gte: +minBattles}, rate: {$gte: 0}}
      if(exclude_gl) payload.attackGl = false
      tempSquads = await mongo.aggregate('gaCounter', payload, pipeline)
      if(!countSquads) countSquads = (await mongo.aggregate('gaCounter', payload, countPipeline))[0]
    }
    if(countSquads?._id) countSquads.id = obj.id
    if(tempSquads?.length > 0){
      tempSquads.forEach(s=>{
        const tempSquad = {
          defense: s.defendSquad.split('-'),
          attack: s.attackSquad.split('-'),
          win: s.win,
          loss: s.loss,
          seen: s.total,
          rate: s.rate
        }
        squads.push(tempSquad)
      })
      if(squads?.length > 0){
        info.season = countSquads?._id
        info.mode = countSquads?.mode
        info.total = countSquads?.total
        info.header = 'GAC Season '+countSquads?._id+' '+countSquads?.mode+' '+(unitList[leader]?.name || leader)+' counters in '+countSquads?.total+' battles'
      }
    }
    if(squads?.length < countSquads?.total){
      let actionRow = { type: 1, components: []}
      if(skip > 0) actionRow.components.push({
        type: 2,
        label: 'Previous '+battleLimit,
        style: 1,
        custom_id: JSON.stringify({...countSquads, skip: skip - battleLimit})
      })
      if(countSquads?.total > skip + battleLimit) actionRow.components.push({
        type: 2,
        label: 'Next '+battleLimit,
        style: 1,
        custom_id: JSON.stringify({...countSquads, skip: skip + battleLimit})
      })
      if(actionRow.components.length > 0) msg2send.components = [actionRow]
    }
    if(squads.length > 0 && info?.header){
      msg2send.content = 'Error getting html'
      webData = await GetHTML(squads, info)
    }
    if(webData){
      msg2send.content = 'Error getting image'
      webImg = await HP.GetImg(webData, obj.id, 1025, false)
    }
    if(webImg){
      msg2send.content = null
      msg2send.file = webImg
      msg2send.fileName = info.season+'-'+info.mode+'-'+info.leader+'.png'
    }
    if(msg2send.components){
      await HP.ButtonPick(obj, msg2send, method)
    }else{
      await HP.ReplyMsg(obj, msg2send)
    }

  }catch(e){
    console.error(e);
    HP.ReplyError(obj)
  }
}
