'use strict'
const { joinImages } = require('join-images')
module.exports = (imgs = [], opts = {})=>{
  return new Promise(async(resolve)=>{
    let opt = {align: 'center', color: { alpha: 1.0, b: 255, g: 255, r: 255 }}
    if(opts) opt = {...opt, ...opts}
    joinImages(imgs, opt).then(img=>{
      img.png()
      resolve(img.toBuffer())
    }).catch(e=>{
      console.log(e)
      resolve()
    })
  })
}
