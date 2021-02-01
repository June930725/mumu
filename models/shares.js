import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shareSchema = new Schema(
  {
    member: {
      type: String,
      required: [true, '請輸入使用者名稱']
    },
    item: {
      type: String,
      required: [true, '請輸入物品名稱']
    },
    shipping: {
      type: String,
      required: [true, '請選擇運送方式']
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

const shares = mongoose.model('shares', shareSchema)

export default shares
