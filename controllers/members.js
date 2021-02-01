import md5 from 'md5'
import members from '../models/members.js'

// 新增
export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    if (req.body.password.length < 4) {
      res.status(400).send({ success: false, message: '密碼長度需 4 字以上' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ success: false, message: '密碼長度需 20 字以下' })
    } else {
      await members.create({
        account: req.body.account,
        password: md5(req.body.password),
        name: req.body.name,
        phoneNum: req.body.phoneNum,
        email: req.body.email,
        address: req.body.address,
        right: false
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已使用' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 登入
export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '格式錯誤' })
    return
  }
  try {
    const result = await members.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    })
    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      // 將使用者資料記錄到 session
      req.session.member = result
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
    console.log(error)
  }
}

// 登出
export const logout = async (req, res) => {
  // 刪除 session
  req.session.destroy(error => {
    // 如果刪除時出錯
    if (error) {
      res.status(500).send({ success: false, message: '發生錯誤，無法登出' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

// 編輯會員資料
export const edit = async (req, res) => {
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    // req.params -> https://xuyuan923.github.io/2014/10/10/node-tutorial-req/
    let result = await members.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (!req.session.member.right && req.params.id !== req.session.member._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
      console.log(typeof req.session.member._id)
      console.log(typeof req.params.id)
    } else {
      result = await members.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: '格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除會員資料
export const clear = async (req, res) => {
  // 如果這個請求為未登入狀態
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.session.member.right) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await members.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      res.status(200).send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    // console.log(error)
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: '格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 查詢指定會員的資料
export const user = async (req, res) => {
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    const result = await members.findById(req.params.id).populate('orderDonate.donation.d_id')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: '格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 查詢所有會員資料
export const users = async (req, res) => {
  if (req.session.right === false) {
    res.status(401).send({ success: false, message: '未登入管理者' })
    return
  }

  try {
    const result = await members.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 新增訂單
export const createOrder = async (req, res) => {
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
  }
  try {
    const result = await members.findByIdAndUpdate(req.params.id, {
      $push: {
        orderDonate: [
          { // 新增到使用者的訂單陣列
            date: new Date(),
            paid: false,
            name: req.body.name,
            phoneNum: req.body.phoneNum,
            email: req.body.email,
            address: req.body.address,
            send: req.body.send,
            note: req.body.note,

            donation: req.body.donation
          }
        ]
      }
    }, { new: true }).populate('orderDonate.donation.d_id')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 編輯訂單
export const editOrder = async (req, res) => {
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await members.order.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (!req.session.member.right || (!req.session.member._id)) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await members.order.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: '格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 刪除訂單
export const delOrder = async (req, res) => {
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.session.member.right) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }

  try {
    const result = await members.order.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      res.status(200).send({ success: true, message: '刪除成功', result })
    }
  } catch (error) {
    // console.log(error)
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: '格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 查詢全部商品訂單
export const getOrders = async (req, res) => {
  if (req.session.right === false) {
    res.status(401).send({ success: false, message: '未登入管理者' })
    return
  }

  try {
    const result = await members.order.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 檢查登入狀況
export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.member !== undefined) {
    isLogin = true
  }
  res.status(200).send(isLogin)
}
