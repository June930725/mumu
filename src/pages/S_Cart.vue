<template>
  <div id="S_Cart">
    <q-page-container class="container">
      <!-- 步驟 -->
      <q-stepper
        animated
        class="q-mb-xl"
        v-model="step"
        ref="stepper"
        alternative-labels
        header-class="text-bold"
        done-color="orange"
        active-color="purple"
        inactive-color="secondary"
      >
        <q-step
          :name="1"
          title="我的捐贈"
          icon="fa fa-shopping-basket"
          :done="step > 1"
        >
          <div class="order01 q-pb-md">捐贈物資</div>

          <q-list bordered>
            <q-item v-if="share.length === 0" class="text-center">
              <div class="w-100 q-ma-auto q-py-xl">
                <p class="q-mb-md">您的需求籃目前是空的</p>
                <q-btn
                  to="/Share"
                  label="＜ 返回募募分享頁面"
                  outline
                  rounded
                />
              </div>
            </q-item>
            <q-item
              v-else
              clickable
              v-for="(sImg, index) in share"
              :key="index"
              class="row"
            >
              <div class="row w-90 justify-around col-12 col-md ">
                <q-item-section class="col-6 col-md-6">
                  <q-img :src="sImg.src" />
                </q-item-section>

                <q-item-section class="col-6 col-md-6 ">
                  <q-item-label>{{ sImg.item }}</q-item-label>

                  <q-item-label :lines="2" caption>{{
                    sImg.requester
                  }}</q-item-label>
                </q-item-section>
              </div>

              <div class="row w-90 justify-evenly col-12 col-md ">
                <q-item-section class="col-3 col-md-4">
                  <div class="q-mx-auto">{{ sImg.spec }}</div>
                </q-item-section>
                <q-item-section class="col-5 col-md-4">
                  <q-field class="q-mx-auto ">
                    <template v-slot:append class="q-px-none">
                      <q-btn
                        class="count_btn"
                        flat
                        round
                        dense
                        icon="remove"
                        :disable="sImg.count < 2"
                        @click.stop="minusShare(sImg._id)"
                      />
                      <span class="count">{{ sImg.count }}</span>
                      <q-btn
                        class="count_btn"
                        flat
                        round
                        dense
                        icon="add"
                        @click.stop="plusShare(sImg._id)"
                      />
                    </template>
                  </q-field>
                </q-item-section>

                <q-item-section class="col-2 col-md-4">
                  <q-btn
                    class="del q-mx-auto"
                    outline
                    rounded
                    @click="delShare(index)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </q-btn>
                </q-item-section>
              </div>
            </q-item>
          </q-list>
        </q-step>

        <q-step
          :name="2"
          title="填寫資料"
          icon="fas fa-user-edit"
          :done="step > 2"
        >
          <div class="order01 q-pb-md">聯絡資料</div>
          <form>
            <q-card-section class="row q-py-lg">
              <div class="col-12">
                <div class="order02">聯絡資料</div>
              </div>
              <div class="col-12 col-md-6 q-gutter-y-md">
                <q-input
                  v-if="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈者姓名 *"
                  v-model="member.name"
                ></q-input>
                <q-input
                  v-else
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈者姓名 *"
                  v-model="order.name"
                  class="q-pb-none"
                  :rules="[val => val && val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 col-md-6 q-gutter-y-md">
                <q-input
                  v-if="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈者電話 *"
                  v-model="member.phoneNum"
                ></q-input>
                <q-input
                  v-else
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈者電話 *"
                  v-model="order.phoneNum"
                  class="q-pb-none"
                  :rules="[val => val && val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 q-gutter-y-md">
                <q-input
                  v-if="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="電子信箱 *"
                  v-model="member.email"
                ></q-input>
                <q-input
                  v-else
                  rounded
                  outlined
                  required
                  type="text"
                  label="電子信箱 *"
                  v-model="order.email"
                  class="q-pb-none"
                  :rules="[val => val && val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 q-gutter-y-md">
                <q-input
                  v-if="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="聯絡地址 *"
                  v-model="member.address"
                ></q-input>
                <q-input
                  v-else
                  rounded
                  outlined
                  required
                  type="text"
                  label="聯絡地址 *"
                  v-model="order.address"
                  class="q-pb-none"
                  :rules="[val => val && val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 q-gutter-y-sm q-pl-md">
                <q-option-group
                  inline
                  v-model="order.send"
                  :options="radios"
                  :rules="[val => val && val.length > 0]"
                />
              </div>

              <div class="col-12 q-gutter-y-md q-mb-sm">
                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈備註 *"
                  v-model="order.note"
                ></q-input>
              </div>

              <div class="col-12 ">
                <q-checkbox v-model="order.checkbox" label="同會員資料" />
              </div>
            </q-card-section>
          </form>
        </q-step>

        <q-step :name="3" title="捐贈確認" icon="fas fa-hand-holding-heart">
          <div class="order03 q-pb-md">捐贈訂單成立</div>
          <q-list bordered>
            <q-item class="q-pa-sm">
              <q-item-label caption class="col-12">{{
                '訂單日期：' + order.date
              }}</q-item-label>
              <q-item-label class="col-12">{{
                '訂單編號：' + orderShare._id
              }}</q-item-label>

              <div class="col-12 order03">聯絡資訊</div>

              <div class="col-12">{{ '姓名：' + orderShare.name }}</div>
              <div class="col-12">{{ '電話：' + orderShare.phoneNum }}</div>
              <div class="col-12">{{ '電子信箱：' + orderShare.email }}</div>
              <div class="col-12">{{ '地址：' + orderShare.address }}</div>

              <div class="col-12 order03">捐贈品項</div>

              <div class="col-12">{{ '捐贈物品：' + order.shares.d_id }}</div>
              <div class="col-12">
                {{ '捐贈數量：' + order.shares.quantity }}
              </div>
            </q-item>
          </q-list>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="share.length === 0"
              disable
              rounded
              outline
              label="下一頁"
            />
            <q-btn
              v-if="step < 2 && share.length !== 0"
              rounded
              outline
              @click="next()"
              label="下一頁"
            />
            <q-btn
              rounded
              filled
              v-if="step === 2"
              @click="$refs.stepper.previous()"
              label="上一頁"
              class="q-mr-sm"
            />
            <q-btn
              v-if="step === 2"
              rounded
              outline
              @click="submit()"
              label="送出"
            />
            <!-- && order.name.length !== null -->
            <q-btn
              v-if="step === 3"
              rounded
              outline
              label="完成"
              to="/Member"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-page-container>
  </div>
</template>

<script>
export default {
  name: 'PageS_Cart',
  data() {
    return {
      step: 1,
      fields: [
        {
          key: 'item',
          label: '物資名稱'
        },
        {
          key: 'requester',
          label: '需求單位'
        },
        {
          key: 'spec',
          label: '物資規格'
        },
        {
          key: 'amount',
          label: '捐贈數量'
        },
        {
          key: 'action',
          label: ' '
        }
      ],
      orderShare: [],
      // 新增訂單
      order: {
        id: '',
        date: new Date(),
        name: '',
        phoneNum: '',
        email: '',
        address: '',
        send: '郵寄',
        note: '',
        // 同會員資料
        checkbox: false,

        shares: [
          {
            d_id: '',
            quantity: ''
          }
        ]
      },

      radios: [
        {
          label: '郵寄',
          value: '郵寄'
        },
        {
          label: '宅配',
          value: '宅配'
        },
        {
          label: '親送',
          value: '親送'
        },
        {
          label: '其他（請於備註欄位說明）',
          value: '其他'
        }
      ]
    }
  },
  computed: {
    share() {
      // 直接取 state 的 share
      // return this.$store.state.share
      // 也可以呼叫 vuex 的 getters
      return this.$store.getters.share
    },
    member() {
      return this.$store.state.member
    },
    donateList() {
      return this.$store.getters.cart.products
    }
  },
  methods: {
    delShare(index) {
      this.$store.commit('delShare', index)
    },
    minusShare(id) {
      this.$store.commit('minusShare', id)
    },
    plusShare(id) {
      this.$store.commit('plusShare', id)
    },
    submit() {
      if (this.member.id.length === 0) {
        this.$q
          .notify({
            color: 'red-6',
            icon: 'fas fa-exclamation-circle',
            message: '請登入會員'
          })
          .then(() => {
            this.$router.push('/login')
          })
      } else {
        this.axios
          .post(
            process.env.VUE_APP_API + '/members/member/order/' + this.member.id,
            this.order
          )
          .then(res => {
            if (res.data.success) {
              this.member.order = res.data.result
              console.log(this.member.order)
            } else {
              this.$q.notify({
                color: 'red-6',
                icon: 'fas fa-exclamation-circle',
                message: res.data.message
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$q.notify({
              color: 'red-6',
              icon: 'fas fa-exclamation-circle',
              message: error.response.data.message
            })
          })
        this.step++
      }
    },
    next() {
      if (this.step === 1) {
        for (const s in this.share) {
          this.order.shares[s] = {
            s_id: this.share[s]._id,
            quantity: this.share[s].count
          }
        }
      }
      this.step++
    }
  }
}
</script>
