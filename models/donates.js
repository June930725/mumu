import mongoose from 'mongoose'

const Schema = mongoose.Schema

const donateSchema = new Schema(
  {
    item: {
      type: String,
      required: [true, '請輸入物品名稱']
    },
    requester: {
      type: String,
      required: [true, '請輸入需求單位']
    },
    spec: {
      type: String,
      required: [true, '請輸入物品規格']
    },
    description: {
      type: String,
      required: [true, '請輸入物品描述']
    },
    amount: {
      type: String,
      required: [true, '請輸入需求數量']
    },
    category: {
      type: String,
      required: [true, '請輸入物品類別']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    }
  },
  {
    versionKey: false
  }
)

const donates = mongoose.model('donates', donateSchema)

export default donates
