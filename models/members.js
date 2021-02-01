import mongoose from 'mongoose'
// 信箱驗證
import validator from 'validator'
import './donates.js'

const Schema = mongoose.Schema

const orderDonateSchema = new Schema(
  {
    d_id: {
      type: mongoose.ObjectId,
      // donates.js 的 donateSchema 來的
      ref: 'donates'
    },
    quantity: {
      type: Number
    }
  }
)

const orderDSchema = new Schema(
  {
    date: {
      type: Date
    },
    send: {
      type: String
    },
    name: {
      type: String,
      required: [true, '請輸入捐贈者姓名']
    },
    phoneNum: {
      type: String,
      required: [true, '請輸入捐贈者電話號碼或手機號碼']
    },
    email: {
      type: String,
      required: [true, '請輸入捐贈者電子信箱'],
      // 自訂信箱驗證規則
      validate: {
        // 信箱驗證 function
        validator (value) {
          return validator.isEmail(value)
        },
        // 錯誤訊息
        message: '信箱格式錯誤'
      }
    },
    address: {
      type: String,
      required: [true, '請輸入捐贈者地址']
    },
    note: {
      type: String
    },
    donation: {
      type: [orderDonateSchema]
    }
  }
)

const orderShareSchema = new Schema(
  {
    s_id: {
      type: mongoose.ObjectId,
      // shares.js 的 shareSchema 來的
      ref: 'shares'
    },
    quantity: {
      type: Number
    },
    note: {
      type: String
    }
  }
)

const orderSSchema = new Schema(
  {
    date: {
      type: Date
    },
    send: {
      type: String
    },
    note: {
      type: String
    },
    shares: {
      type: [orderShareSchema]
    }
  }
)

const memberSchema = new Schema(
  {
    account: {
      type: String,
      required: [true, '請輸入使用者帳號'],
      minlength: [4, '帳號必需四個字以上'],
      maxlength: [20, '帳號必需二十字以下'],
      unique: true
    },
    password: {
      type: String,
      required: [true, '請輸入使用者密碼']
    },
    name: {
      type: String,
      required: [true, '請輸入使用者姓名']
    },
    phoneNum: {
      type: String,
      required: [true, '請輸入使用者電話號碼或手機號碼'],
      unique: true
    },
    email: {
      type: String,
      required: [true, '請輸入使用者電子信箱'],
      unique: true,
      // 自訂信箱驗證規則
      validate: {
        // 信箱驗證 function
        validator (value) {
          return validator.isEmail(value)
        },
        // 錯誤訊息
        message: '信箱格式錯誤'
      }
    },
    address: {
      type: String,
      required: [true, '請輸入使用者地址']
    },
    right: {
      type: Boolean
    },
    orderDonate: {
      type: [orderDSchema]
    },
    orderShare: {
      type: [orderSSchema]
    }
  },
  {
    versionKey: false
  }
)

const members = mongoose.model('members', memberSchema)

export default members
