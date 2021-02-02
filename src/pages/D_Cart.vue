<template>
  <div id="D_Cart">
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
            <q-item v-if="donate.length === 0" class="text-center">
              <div class="w-100 q-ma-auto q-py-xl">
                <p class="q-mb-md">您的捐贈籃目前是空的</p>
                <q-btn
                  to="/Donate"
                  label="＜ 返回物資捐贈頁面"
                  outline
                  rounded
                />
              </div>
            </q-item>
            <q-item
              v-else
              clickable
              v-for="(dImg, index) in donate"
              :key="index"
              class="row"
            >
              <div class="row w-90 justify-around col-12 col-md ">
                <q-item-section class="col-6 col-md-4">
                  <q-img :src="dImg.src" />
                </q-item-section>

                <q-item-section class="col-6 col-md-8 ">
                  <q-item-label class="q-pl-sm">{{ dImg.item }}</q-item-label>

                  <q-item-label :lines="2" caption class="q-pl-sm">{{
                    dImg.requester
                  }}</q-item-label>
                </q-item-section>
              </div>

              <div class="row w-90 justify-evenly col-12 col-md ">
                <q-item-section class="col-3 col-md-4">
                  <div class="q-mx-auto">{{ dImg.spec }}</div>
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
                        :disable="dImg.count < 2"
                        @click.stop="minusBasket(dImg._id)"
                      />
                      <span class="count">{{ dImg.count }}</span>
                      <q-btn
                        class="count_btn"
                        flat
                        round
                        dense
                        icon="add"
                        @click.stop="plusBasket(dImg._id)"
                      />
                    </template>
                  </q-field>
                </q-item-section>

                <q-item-section class="col-2 col-md-4">
                  <q-btn
                    class="del q-mx-auto"
                    outline
                    rounded
                    @click="delBasket(index)"
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
            <q-card-section class="row q-py-md">
              <div class="col-12 col-md-6 q-gutter-y-md">
                <q-input
                  :readonly="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈者姓名 *"
                  v-model="order.name"
                  class="q-pb-none"
                  :rules="[val => val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 col-md-6 q-gutter-y-md">
                <q-input
                  :readonly="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="捐贈者電話 *"
                  v-model="order.phoneNum"
                  class="q-pb-none"
                  :rules="[val => val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 q-gutter-y-md">
                <q-input
                  :readonly="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="電子信箱 *"
                  v-model="order.email"
                  class="q-pb-none"
                  :rules="[val => val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 q-gutter-y-md">
                <q-input
                  :readonly="order.checkbox === true"
                  rounded
                  outlined
                  required
                  type="text"
                  label="聯絡地址 *"
                  v-model="order.address"
                  class="q-pb-none"
                  :rules="[val => val.length > 0]"
                ></q-input>
              </div>

              <div class="col-12 q-gutter-y-sm q-pl-md">
                <q-option-group inline v-model="order.send" :options="radios" />
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
            <q-item class="q-pa-md">
              <div
                class="orderLine col-12 flex justify-between items-center q-px-sm"
              >
                <div
                  class="ordNum"
                  v-if="
                    member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                      : null
                  "
                >
                  訂單編號&nbsp;
                  <b>{{
                    member.orderDonate[member.orderDonate.length - 1]._id
                  }}</b>
                </div>
                <div
                  class="date"
                  v-if="
                    member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                      : null
                  "
                >
                  {{
                    member.orderDonate[
                      member.orderDonate.length - 1
                    ].date.substr(0, 10)
                  }}
                </div>
              </div>
              <div class="col-12 q-pa-sm">
                <div class="col-12 order03 q-pb-sm">聯絡資訊</div>
                <div
                  class="col-12 detail"
                  v-if="
                    member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                      : null
                  "
                >
                  {{
                    '姓名：' +
                      member.orderDonate[member.orderDonate.length - 1].name
                  }}
                </div>
                <div
                  class="col-12 detail"
                  v-if="
                    member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                      : null
                  "
                >
                  {{
                    '電話：' +
                      member.orderDonate[member.orderDonate.length - 1].phoneNum
                  }}
                </div>
                <div
                  class="col-12 detail"
                  v-if="
                    member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                      : null
                  "
                >
                  {{
                    '電子信箱：' +
                      member.orderDonate[member.orderDonate.length - 1].email
                  }}
                </div>
                <div
                  class="col-12 detail"
                  v-if="
                    member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                      : null
                  "
                >
                  {{
                    '地址：' +
                      member.orderDonate[member.orderDonate.length - 1].address
                  }}
                </div>
              </div>
              <q-separator spaced class="q-my-sm" />
              <div class="col-12 q-pa-sm">
                <div class="col-12 order03 q-pb-sm">捐贈品項</div>
                <div class="col-12">
                  <div
                    v-for="(itemD, index) in member.orderDonate.length > 0
                      ? member.orderDonate[member.orderDonate.length - 1]
                          .donation
                      : 0"
                    :key="index"
                  >
                    <div class="col-12 detailDonation">
                      {{ '捐贈物品：' + itemD.d_id.item }}
                    </div>
                    <div class="col-12 detailDonation">
                      {{ '捐贈數量：' + itemD.quantity }}
                    </div>
                    <q-separator class="q-my-sm" />
                  </div>
                  <div
                    class="col-12 detail"
                    v-if="
                      member.orderDonate.length > 0
                        ? member.orderDonate[member.orderDonate.length - 1]
                        : null
                    "
                  >
                    {{
                      '寄送方式：' +
                        member.orderDonate[member.orderDonate.length - 1].send
                    }}
                  </div>
                  <div
                    class="col-12 detail"
                    v-if="
                      member.orderDonate.length > 0
                        ? member.orderDonate[member.orderDonate.length - 1]
                        : null
                    "
                  >
                    {{
                      '捐贈備註：' +
                        member.orderDonate[member.orderDonate.length - 1].note
                    }}
                  </div>
                </div>
              </div>
            </q-item>
          </q-list>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="donate.length === 0 && step < 2"
              disable
              rounded
              outline
              label="下一頁"
            />
            <q-btn
              v-if="step < 2 && donate.length !== 0"
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
  name: 'PageD_Cart',
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
      orderDonate: [],
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

        donation: [
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
          label: '面交',
          value: '面交'
        },
        {
          label: '其他（請於備註欄位說明）',
          value: '其他'
        }
      ]
    }
  },
  watch: {
    order: {
      deep: true,
      handler() {
        if (this.order.checkbox) {
          this.order.name = this.member.name
          this.order.phoneNum = this.member.phoneNum
          this.order.email = this.member.email
          this.order.address = this.member.address
        }
      }
    }
  },
  computed: {
    donate() {
      // 直接取 state 的 donate
      // return this.$store.state.donate
      // 也可以呼叫 vuex 的 getters
      return this.$store.getters.donate
    },
    member() {
      return this.$store.state.member
    },
    donateList() {
      return this.$store.getters.cart.products
    }
  },
  methods: {
    delBasket(index) {
      this.$store.commit('delBasket', index)
    },
    minusBasket(id) {
      this.$store.commit('minusBasket', id)
    },
    plusBasket(id) {
      this.$store.commit('plusBasket', id)
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
              // this.member.order = res.data.result
              // console.log(this.member.orderDonate)
              this.$store.commit('addorder', res.data.result)
            } else {
              this.$q.notify({
                color: 'red-6',
                icon: 'fas fa-exclamation-circle',
                message: res.data.message
              })
            }
          })
          .catch(error => {
            // console.log(error)
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
        for (const d in this.donate) {
          this.order.donation[d] = {
            d_id: this.donate[d]._id,
            quantity: this.donate[d].count
          }
        }
      }
      this.step++
    }
  }
}
</script>
