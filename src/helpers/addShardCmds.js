'use strict'
module.exports = async(sId)=>{
  try{
    let cmds = [], count = 0, res = {status: 'error'}
    const slashCmds = (await mongo.find('slashCmds', {_id: 'swgoh'}))[0]
    if(slashCmds?.cmds) cmds = slashCmds.cmds.filter(x=>x.type === 'shard').map(x=>x.cmd)
    if(sId && cmds?.length > 0){
      for(let i in cmds){
        const status = await MSG.RESTHandler('/applications/'+process.env.DISCORD_CLIENT_ID+'/guilds/'+sId+'/commands', 'POST', JSON.stringify(cmds[i]))
        if(status?.id) count++
      }
    }
    if(cmds?.length > 0 && +cmds.length == count) res.status = 'ok'
    return res
  }catch(e){
    console.error(e);
  }
}
