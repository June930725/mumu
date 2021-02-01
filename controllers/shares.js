// 讀取上傳進來的檔案
import multer from 'multer'
import FTPStorage from 'multer-ftp'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

import shares from '../models/shares.js'

dotenv.config()

let storage
// 本機開發，檔案存電腦
// 雲端環境，檔案存 FTP
if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    // req 請求
    // file 檔案資訊
    // callback 處理的 function
    destination (req, file, callback) {
      // callback(null, 資料夾)
      callback(null, 'images/')
    },
    filename (req, file, callback) {
      // 用時間戳記來命名檔案名稱，可以確保檔案名稱絕對不會重複
      // 時間當檔名 + 原上傳檔案的副檔名
      // callback(null, 檔案名稱)
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({
    // FTP 登入設定
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    // 上傳的路徑含檔名
    // 路徑為 FTP 的絕對路徑
    destination (req, file, options, callback) {
      // 用時間戳記來命名檔案名稱，可以確保檔案名稱絕對不會重複
      // 時間當檔名 + 原上傳檔案的副檔名
      // callback(null, 檔案名稱)
      callback(null, '/' + Date.now() + path.extname(file.originalname))
    }
  })
}

// 上傳設定
const upload = multer({
  storage,
  // 過濾檔案
  fileFilter (req, file, callback) {
    if (file.mimetype.includes('image')) {
      callback(null, true)
    } else {
      // 回應一個 multer 錯誤
      // 因為套件觸發的錯誤類型是 MulterError
      // 觸發跟套件一樣的錯誤類型保持格式統一，就不用另外判斷是寫哪種錯誤，也能直接知道是上傳發生的錯誤
      // LIMIT_FORMAT 是自訂錯誤 code，和內建的格式統一
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    }
  },
  limits: {
    // 上傳檔案大小限制 1MB
    // 單位是 B
    // 1KB = 1024 B
    // 1MB = 1024 KB
    fileSize: 1024 * 1024
  }
})

// 新增
export const create = async (req, res) => {
  // 如果這個請求為未登入狀態
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // multipart/form-data 可以同時代文字資料和檔案
  // 是 HTML form 標籤送出後的表單資料型態之一
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  // 只接受上傳一個檔案
  // 上傳的欄位名稱叫做 file
  // 將 express 的 req, res 傳入上傳動作
  // error 是檔案上傳發生的錯誤
  // upload.single( 欄位,)( req, res, 上傳完畢後的 function )
  upload.single('image')(req, res, async error => {
    // 如果是上傳錯誤
    if (error instanceof multer.MulterError) {
      let message = ''

      // error code
      // https://github.com/expressjs/multer/blob/master/lib/multer-error.js#L3-L11
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '檔案格式不符'
      } else {
        message = '上傳錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let file = ''
        if (process.env.DEV === 'true') {
          file = req.file.filename
        } else {
          file = path.basename(req.file.path)
        }
        const result = await shares.create({
          member: req.session.member._id,
          item: req.body.item,
          shipping: req.body.shipping,
          description: req.body.description,
          amount: req.body.amount,
          category: req.body.category,
          file
        })
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
  })
}

// 編輯
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
    let result = await shares.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (!req.session.member.right || (!req.session.member._id)) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      result = await shares.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

// 刪除
export const clear = async (req, res) => {
  if (req.session.member === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.session.member.right || (!req.session.member._id)) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await shares.findByIdAndDelete(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      res.status(200).send({ success: true, message: '刪除成功', result })
    }

    // 刪除本機圖片檔案
    if (process.env.DEV === 'true') {
      fs.unlink('images/' + result.file, () => {})
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: '格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// 查詢指定會員發布的資料 *****
export const user = async (req, res) => {
  try {
    const result = await shares.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 查詢所有會員發布的資料 *****
export const share = async (req, res) => {
  try {
    const result = await shares.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
    console.log(req.params.id)
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// 查詢
export const file = async (req, res) => {
  // 開發環境回傳本機圖片
  if (process.env.DEV === 'true') {
    const path = process.cwd() + '/images/' + req.params.file
    const exists = fs.existsSync(path)

    if (exists) {
      res.status(200).sendFile(path)
    } else {
      res.status(404).send({ success: false, message: '找不到圖片' })
    }
  } else {
    axios({
      method: 'GET',
      url: 'http://' + process.env.FTP_HOST + '/' + process.env.FTP_USER + '/' + req.params.file,
      responseType: 'stream'
    }).then(ress => {
      ress.data.pipe(res)
    }).catch(error => {
      console.log(error)
      res.status(error.response.status).send({ success: false, message: '取得圖片失敗' })
    })
  }
}

// 查詢所有會員的資料
export const users = async (req, res) => {
  if (req.session.right === false) {
    res.status(401).send({ success: false, message: '未登入管理者' })
    return
  }

  try {
    const result = await shares.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
