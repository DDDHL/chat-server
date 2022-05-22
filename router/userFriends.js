// 用户好友路由
var express = require('express')
var router = express.Router()
const {
  searchFriendList,
  searchFriendListInfo,
  addFriend,
} = require('../data/userFriendSql')
const { newImageAddress } = require('../utils/imagesAddress')

// 用户新增好友
router.post('/addNewFriend', (req, res) => {
  let account = req.body.account
  let paramsAccount = req.body.paramsAccount
  if (!account && !paramsAccount) {
    throw new Error(1006)
  }
  // 查询好友列表
  searchFriendList(account).then((result) => {
    if (JSON.parse(result[0].friendId) == null) {
      // 没有好友直接添加
      var data = `["${paramsAccount}"]`
    } else {
      var data = JSON.parse(result[0].friendId)
      data.push(paramsAccount)
      data = JSON.stringify(data)
    }
    // 添加新id
    addFriend(data, account).then((result) => {
      if (result.changedRows == 1) {
        // 同样的步骤执行给好友也添加
        searchFriendList(paramsAccount).then((result) => {
          if (JSON.parse(result[0].friendId) == null) {
            // 没有好友直接添加
            var data1 = `["${account}"]`
          } else {
            var data1 = JSON.parse(result[0].friendId)
            data1.push(account)
            data1 = JSON.stringify(data1)
          }
          addFriend(data1, paramsAccount).then((result) => {
            if (result.changedRows == 1) {
              res.send({
                code: '',
                message: '添加好友成功',
              })
            }
          })
        })
      }
    })
  })
})

// 用户获取好友列表
router.post('/getFriendList', (req, res) => {
  let account = req.body.account
  if (!account) {
    throw new Error(1006)
  }
  searchFriendList(account).then((result) => {
    let data = ''
    let list = JSON.parse(result[0].friendId)
    if (list == null) {
      res.send({
        code: '',
        message: '',
        data: {},
      })
      return
    }
    // 循环处理成 '',''
    for (let i = 0; i < list.length; i++) {
      data += "'" + list[i] + "'"
      if (i != list.length - 1) {
        data += ','
      }
    }
    searchFriendListInfo(data).then((result) => {
      res.send({
        code: '',
        message: '',
        data: newImageAddress(req.headers.host, result),
      })
    })
  })
})
module.exports = router
