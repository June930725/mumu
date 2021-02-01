import express from 'express'

import { create, edit, clear, admin, donation, file } from '../controllers/donates.js'

const router = express.Router()

router.post('/', create) // [新增商品

router.patch('/:id', edit) // 編輯商品

router.delete('/:id', clear) // 刪除商品

router.get('/', admin) // 查詢管理者的資料

router.get('/:id', donation) // 查詢指定商品的資料

router.get('/file/:file', file) // 查詢全部商品的資料

export default router
