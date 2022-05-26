// 图片上传路由
var express = require('express')
var router = express.Router()
const multer = require('multer')
const fs = require('fs')
const { nanoid } = require('nanoid')
const { updateAvatar } = require('../data/upLoadSql')
const {
  createGroupNew,
  deleteOne,
  publishSingleUpdate,
  publishSingleInsert,
  checkGroup,
} = require('../data/userSql')
const { searchFriendList } = require('../data/userFriendSql')
var { promiseErr } = require('../utils/error')
const { newImageAddress } = require('../utils/imagesAddress')
const dayjs = require('dayjs')

// 用户更改个人图片
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

// 用户发布动态保存图片
router.post(
  '/upLoadGroup',
  multer({
    //设置文件存储路径
    dest: 'public/group',
  }).array('file', 1),
  (req, res) => {
    if (!req.auth.account) {
      throw new Error(1006)
    }
    let files = req.files
    let file = files[0]
    let pictureName = nanoid()
    let path = 'public/group/' + pictureName + file.originalname
    fs.renameSync('./public/group/' + file.filename, path)
    createGroupNew(req.auth.account, pictureName + file.originalname).then(
      (result) => {
        if (result.affectedRows == 1) {
          res.send({
            code: '',
            message: '',
            data: { path: 'http://' + req.headers.host + '/' + path },
          })
        }
      }
    )
  }
)

// 用户取消发布动态，删除已保存图片
router.post('/deleteImg', (req, res) => {
  let account = req.auth.account
  if (!account || !req.body.path) {
    throw new Error(1006)
  }
  let deletePath = req.body.path.split('/public/group/')[1]
  fs.unlink('./public/group/' + deletePath, (err) => {
    if (err) {
      res.send({
        code: 1009,
        message: '删除文件失败',
        data: {},
      })
    } else {
      deleteOne(account)
        .then((result) => {
          if (result.affectedRows == 1) {
            res.send({
              code: '',
              message: '删除成功',
              data: {},
            })
          }
        })
        .catch((err) => {
          res.send({
            code: 1010,
            message: '删除数据库记录失败',
            data: {},
          })
        })
    }
  })
})

// 用户发布完整动态
router.post('/publishSingle', (req, res) => {
  let account = req.auth.account
  let info = req.body.info
  let state = req.body.state
  let name = req.body.name
  let avatar = req.body.avatar
  if (!info || !account || !state || !name || !avatar) {
    throw new Error(1006)
  }
  if (state == 'false') {
    publishSingleInsert(
      account,
      info,
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      name,
      avatar
    )
      .then((result) => {
        if (result.affectedRows == 1) {
          res.send({
            code: '',
            message: '发布动态成功!',
            data: {},
          })
        }
      })
      .catch((err) => {
        promiseErr('服务器发布动态出错1', res)
      })
  } else if (state == 'true') {
    publishSingleUpdate(
      account,
      info,
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      name,
      avatar
    )
      .then((result) => {
        if (result.changedRows == 1) {
          res.send({
            code: '',
            message: '发布动态成功!',
            data: {},
          })
        }
      })
      .catch((err) => {
        promiseErr('服务器发布动态出错2', res)
      })
  }
})
// 查询好友动态
router.post('/checkGroup', (req, res) => {
  let account = req.auth.account
  if (!account) {
    throw new Error(1006)
  }
  searchFriendList(account).then((result) => {
    if (result[0].friendId) {
      let list = JSON.parse(result[0].friendId)
      // 循环处理成 '',''
      let data = ''
      for (let i = 0; i < list.length; i++) {
        data += "'" + list[i] + "'"
        if (i != list.length - 1) {
          data += ','
        }
      }
      data += `,'${account}'`
      checkGroup(data).then((result) => {
        res.send({
          code: '',
          message: '',
          data: newImageAddress(req.headers.host, result, 'false'),
        })
      })
    } else {
      res.send({
        code: '',
        message: '',
        data: {},
      })
    }
  })
})
module.exports = router
