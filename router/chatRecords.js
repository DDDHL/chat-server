// 聊天记录
var express = require('express')
var router = express.Router()
var { promiseErr } = require('../utils/error')
const { checkChatRecordBySingle } = require('../data/chatRecordSql')

// 获取单人聊天记录
router.post('/getChatRecordBySingle', (req, res) => {
  let account = req.auth.account
  let pageSize = req.body.pageSize
  let paramsAccount = req.body.paramsAccount
  if (!account || !paramsAccount || !pageSize) {
    throw new Error(1006)
  }
  checkChatRecordBySingle(account, paramsAccount, pageSize)
    .then((result) => {
      res.send({
        code: '',
        message: '',
        data: result,
      })
    })
    .catch((err) => {
      promiseErr(err, res)
    })
})
module.exports = router
