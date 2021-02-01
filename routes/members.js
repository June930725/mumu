import express from 'express'

import { create, login, logout, edit, clear, user, users, heartbeat, createOrder, editOrder, delOrder, getOrders } from '../controllers/members.js'

const router = express.Router()

router.post('/', create)

router.post('/login', login)

router.delete('/logout', logout)

router.patch('/:id', edit) // 編輯會員資料

router.delete('/:id', clear) // 刪除會員資料

router.get('/member/:id', user) // 查詢指定會員資料

router.get('/member/', users) // 查詢所有會員資料

router.post('/member/order/:id', createOrder) // 新增商品訂單

router.patch('/member/order/:id', editOrder) // 編輯商品訂單

router.delete('/member/order/:id', delOrder) // 刪除商品訂單

router.get('/member/order/:id', getOrders) // 查詢全部商品訂單

router.get('/heartbeat', heartbeat)

export default router
