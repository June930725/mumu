// MongoDB 操作套件
import mongoose from 'mongoose'
// 網頁伺服器
import express from 'express'
// 讀取傳入網頁伺服器的資料
import bodyParser from 'body-parser'
// 讀取環境設定檔
import dotenv from 'dotenv'
// express 允許跨域請求
import cors from 'cors'
// 把使用者的變數存在 serve，serve 用儲存的資料來判斷進來的是誰
import session from 'express-session'
// 把狀態儲存在 mongoDB 裡面
import connectMongo from 'connect-mongo'

import donateRoutes from './routes/donates.js'
import memberRoutes from './routes/members.js'
import shareRoutes from './routes/shares.js'

dotenv.config()

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true }, { useFindAndModify: false })

const app = express()

const MongoStore = connectMongo(session)

const sessionSettings = {
  // 密鑰
  secret: 'mumuback',
  // 設定儲存位置
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  // 登入有效期限，單位是 ms
  cookie: {
    maxAge: 1000 * 60 * 30
    // 允許不同網域的認證資訊
    // 上 Heruku 再開啟
    // sameSite: 'none',
    // secure: true
  },
  // 是否保存未被修改的 session
  saveUninitialized: false,
  // 是否每次請求重設登入有效時間
  rolling: true,
  // 是否強制將 session 存回 mongodb，即使她沒被修改
  resave: true
}

if (process.env.DEV === 'false') {
  // 如果不是本機的開發環境，設定允許不同網域的認證
  sessionSettings.cookie.sameSite = 'none'
  // 如果是不同網域的認證，一定要設定 secure
  sessionSettings.cookie.secure = true
}

app.use(session(sessionSettings))

// 必須要設定這個，不然後台上 Heroku 時無法登入
app.set('trust proxy', 1)

app.listen(process.env.PORT, () => {
  // console.log('http://localhost:' + process.env.PORT)
  console.log('server started')
})

app.use(bodyParser.json())

// 跨域設定
app.use(cors({
  origin (origin, callback) {
    // 如果是 postman 之類的後端，接受請求
    if (origin === undefined) {
      callback(null, true)
    } else {
      // 如果設定允許 cors，接受所有請求
      if (process.env.DEV === 'true') {
        callback(null, true)
        // 如果設定不允許，但是是從 github 過來的請求，也接受
      } else if (origin.includes('github')) {
        callback(null, true)
        // 如果設定不允許，也不是從 github 過來的請求，拒絕
      } else {
        callback(new Error('Not allowed'), false)
      }
    }
  },
  // 因為要做登入，所以要允許接收認證資訊
  credentials: true
}))

app.use('/members', memberRoutes)
app.use('/donates', donateRoutes)
app.use('/shares', shareRoutes)
