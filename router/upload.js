// 图片上传路由
var express = require('express')
var router = express.Router()
const multer = require('multer')
const fs = require('fs')
const { nanoid } = require('nanoid')
const { updateAvatar } = require('../data/upLoadSql')
var { promiseErr } = require('../utils/error')

// 用户新增好友
router.post(
  '/upLoadSingle',
  multer({
    //设置文件存储路径
    dest: 'public/images',
  }).array('file', 1),
  (req, res) => {
    if (!req.auth.account) {
      throw new Error(1006)
    }
    let files = req.files
    let file = files[0]
    let pictureName = nanoid()
    let path = 'public/images/' + pictureName + file.originalname
    fs.renameSync('./public/images/' + file.filename, path)
    //获取文件基本信息
    /* let fileInfo = {}
    fileInfo.type = file.mimetype
    fileInfo.name = file.originalname
    fileInfo.size = file.size
    fileInfo.path = path */
    updateAvatar(req.auth.account, pictureName + file.originalname)
      .then((result) => {
        if (result.affectedRows == 1) {
          res.send({
            code: '',
            message: '更新头像成功',
            data: { path: 'http://' + req.headers.host + '/' + path },
          })
        }
      })
      .catch((err) => {
        promiseErr(err, res)
      })
  }
)

module.exports = router
