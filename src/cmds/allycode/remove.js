'use strict'
module.exports = async(obj, opt)=>{
  try{
    let msg2send = {content: 'There are no allyCode(s) regsiterd to your discordId'}, allyCode, allyObj
    const dObj = (await mongo.find('discordId', {_id: obj.member.user.id}))[0]
    if(obj.confirm && obj.confirm.allyCode) allyCode = +obj.confirm.allyCode
    if(dObj?.allyCodes && dObj.allyCodes.length > 0){
      if(allyCode){
        allyObj = dObj.allyCodes.find(x=>x.allyCode === allyCode)
      }else{
        const embedMsg = {
          content: 'Please pick which allyCode to unlink.',
          components: [],
          flags: 64
        }
        let x = 0
        for(let i in dObj.allyCodes){
          if(!embedMsg.components[x]) embedMsg.components[x] = { type:1, components: []}
          embedMsg.components[x].components.push({
            type: 2,
            label: dObj.allyCodes[i].name+' ('+dObj.allyCodes[i].allyCode+')',
            style: 1,
            custom_id: JSON.stringify({id: obj.id, allyCode: dObj.allyCodes[i].allyCode})
          })
          if(embedMsg.components[x].components.length == 5) x++;
        }
        await HP.ButtonPick(obj, embedMsg)
      }
      if(allyCode && allyObj){
        if(allyObj.type == 'google' || allyObj.type == 'codeAuth') mongo.del('tokens', {_id: allyObj.uId})
        if(allyObj.type == 'facebook') mongo.del('facebook', {_id: allyObj.uId})
        if(allyObj.uId) mongo.del('identity', {_id: allyObj.uId})
        await mongo.pull('discordId', {_id: obj.member.user.id}, {allyCodes: {allyCode: allyCode}})
        msg2send.content = 'allyCode **'+allyCode+'** has been unlinked from your discordId'
      }
    }
    HP.ReplyMsg(obj, msg2send)
  }catch(e){
    console.log(e)
    HP.ReplyError(obj)
  }
}
