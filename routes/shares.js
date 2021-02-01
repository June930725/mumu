import express from 'express'

import { create, edit, clear, user, users, share, file } from '../controllers/shares.js'

const router = express.Router()

router.post('/', create)

router.patch('/:id', edit)

router.delete('/:id', clear) // 會員刪除資料

router.get('/member/:id', user) // 查詢指定會員發布的資料

router.get('/member/', users) // 查詢所有會員的資料

router.get('/:id', share) // 查詢指定商品的資料

router.get('/file/:file', file)

export default router
