'use strict'
const Cmds = {}
Cmds.add = require('./add')
Cmds.auth = require('./auth')
Cmds.clean = require('./clean')
Cmds.remove = require('./remove')
Cmds.set = require('./set')
Cmds.show = require('./show')
module.exports = async(obj)=>{
  try{
    let tempCmd, opt = []
    if(!tempCmd && obj.data.options){
      for(let i in obj.data.options){
        if(Cmds[obj.data.options[i].name]){
          tempCmd = obj.data.options[i].name
          if(obj.data.options[i].options) opt = obj.data.options[i].options
          break;
        }
      }
    }
    if(tempCmd && Cmds[tempCmd]){
      await Cmds[tempCmd](obj, opt)
    }else{
      HP.ReplyMsg(obj, {content: (tempCmd ? '**'+tempCmd+'** command not recongnized':'command not provided')})
    }
  }catch(e){
    console.log(e)
    HP.ReplyError(obj)
  }
}
