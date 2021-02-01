import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      member: {
        account: '',
        password: '',
        id: '',
        name: '',
        phoneNum: '',
        email: '',
        address: '',
        right: '',
        orderDonate: []
      },
      // 捐贈籃
      donate: [],
      // 需求籃
      share: []

    },
    mutations: {
      login (state, data) {
        state.member.account = data.account
        state.member.id = data._id
        state.member.name = data.name
        state.member.phoneNum = data.phoneNum
        state.member.email = data.email
        state.member.address = data.address
        state.member.right = data.right
      },
      logout (state, data) {
        state.member.account = ''
        state.member.id = ''
        state.member.name = ''
        state.member.phoneNum = ''
        state.member.email = ''
        state.member.address = ''
        state.member.right = ''
      },
      addorder (state, data) {
        state.member.orderDonate = data.orderDonate
        state.donate = []
      },
      // 捐贈頁面
      // state 代表上面的 state
      // data 代表傳入的資料
      addBasket(state, data) {
        // state.donate.push(data)
        const index = state.donate.findIndex(item => {
          return item.item === data.item
        })
        if (index === -1) {
          state.donate.push({ ...data, count: 1 })
          // console.log(state.donate)
        } else {
          state.donate[index].count++
        }
      },
      delBasket(state, index) {
        state.donate.splice(index, 1)
      },
      editBasket (state, data) {
        state.donate = data
      },
      minusBasket (state, id) {
        const idx = state.donate.findIndex(donate => donate._id === id)
        state.donate[idx].count--
        if (state.donate[idx].count < 0) state.donate[idx].count = 0
      },
      plusBasket (state, id) {
        const idx = state.donate.findIndex(donate => donate._id === id)
        state.donate[idx].count++
      },
      // 分享頁面
      addShare(state, data) {
        // state.share.push(data)
        const index = state.share.findIndex(item => {
          return item.item === data.item
        })
        if (index === -1) {
          state.share.push({ ...data, count: 1 })
          // console.log(state.donate)
        } else {
          state.share[index].count += data.count
        }
      },
      delShare(state, index) {
        state.share.splice(index, 1)
      },
      editShare (state, data) {
        state.share = data
      },
      minusShare (state, id) {
        const idx = state.share.findIndex(share => share._id === id)
        state.share[idx].count--
        if (state.donate[idx].count < 0) state.share[idx].count = 0
      },
      plusShare (state, id) {
        const idx = state.share.findIndex(share => share._id === id)
        state.share[idx].count++
      }
    },
    modules: {
      // example
    },
    // getters 適用於要將資料處理好再丟出去時使用
    getters: {
      donate (state) {
        return state.donate
      },
      share (state) {
        return state.share
      }
    },
    plugins: [Persistedstate()],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })
  return Store
}
