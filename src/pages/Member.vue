<template>
  <div id="member">
    <q-page-container class="containerM">
      <div class="row">
        <!-- 個人資料 -->
        <div class="col-12 q-px-lg q-mb-lg">
          <q-card class="my-card">
            <q-card-section
              class="bg-mu11 text-white flex justify-between items-end"
            >
              <div class="profile">會員資料</div>
              <div class="text-subtitle">{{ mem.account }}</div>
            </q-card-section>

            <q-card-section class="mEdit bg-white text-white">
              <div v-if="editing === true">
                <q-input
                  outlined
                  filled
                  class="q-pb-sm"
                  label="姓名"
                  v-model="mem.modelName"
                >
                </q-input>

                <q-input
                  outlined
                  filled
                  class="q-pb-sm"
                  label="電話"
                  v-model="mem.modelPhoneNum"
                >
                </q-input>

                <q-input
                  outlined
                  filled
                  class="q-pb-sm"
                  label="電子信箱"
                  v-model="mem.modelEmail"
                >
                </q-input>

                <q-input
                  outlined
                  filled
                  class="q-pb-sm"
                  label="地址"
                  v-model="mem.modelAddress"
                >
                </q-input>

                <div align="right">
                  <q-btn @click="save()" class="save q-mr-xs" outline rounded>
                    <i class="fas fa-save"></i>
                  </q-btn>
                  <q-btn @click="cancel()" class="cancel" outline rounded>
                    <i class="fas fa-times"></i>
                  </q-btn>
                </div>
              </div>
              <div v-else>
                <p>姓名：{{ mem.name }}</p>
                <p>電話：{{ mem.phoneNum }}</p>
                <p>電子信箱：{{ mem.email }}</p>
                <p>地址：{{ mem.address }}</p>
                <div align="right">
                  <q-btn @click="edit()" class="edit" outline rounded>
                    <i class="fas fa-pen"></i>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- 捐贈訂單資料 -->
        <div class="col-12 q-px-lg q-mb-lg order">
          <q-card class="my-card q-pb-md">
            <q-card-section
              class="bg-mu03 text-white flex justify-between items-end"
            >
              <div class="profile">捐贈訂單資料</div>
            </q-card-section>

            <div>
              <q-card-section
                class="oEdit bg-white text-white"
                v-for="(order, index) in mem.orderDonate"
                :key="index"
              >
                <div class="q-pr-xs q-mb-xs date text-right">
                  {{ order.date.substr(0, 10) }}
                </div>

                <q-list>
                  <q-card-section class="ordNum">
                    訂單編號 {{ order._id }}
                  </q-card-section>

                  <q-expansion-item label="聯絡資訊" class="connect">
                    <q-card>
                      <q-card-section>
                        <p>姓名：{{ order.name }}</p>
                        <p>電話：{{ order.phoneNum }}</p>
                        <p>電子信箱：{{ order.email }}</p>
                        <p>地址：{{ order.address }}</p>
                        <p>寄送方式：{{ order.send }}</p>
                        <p>捐贈備註：{{ order.note }}</p>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>

                  <q-expansion-item label="捐贈明細" class="detail">
                    <q-card class="row">
                      <q-card-section
                        v-for="(itemD, index) in order.donation"
                        :key="index"
                        class="col-6 col-md-4 col-lg-3"
                      >
                        <q-item-section class="col-12">
                          <q-img
                            :src="img(itemD.d_id.file)"
                            class="q-mb-sm row"
                          />
                          <div class="col-12">
                            <q-item-label>{{ itemD.d_id.item }}</q-item-label>
                            <q-item-label :lines="2" class="caption">
                              數量：{{ itemD.quantity }}
                            </q-item-label>
                          </div>
                        </q-item-section>

                        <q-item-section class="col-6 col-md-6 ">
                        </q-item-section>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
            </div>
          </q-card>
        </div>
      </div>

      <!-- 新增按鈕 -->
      <q-btn
        class="add"
        round
        icon="fa fa-plus"
        size="md"
        @click="shareCard = true"
      />

      <!-- dialog 彈出視窗 -->
      <!-- 新增 -->
      <q-dialog v-model="shareCard">
        <q-card id="shareCard">
          <q-card-section>
            <div text-overline>新增物資需求</div>
          </q-card-section>
          <form @submit.prevent="add" @reset="addReset">
            <q-card-section class="row">
              <div class="mt-0 col-12 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  auto
                  type="text"
                  label="物品名稱 *"
                  v-model="share.item"
                >
                </q-input>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-select
                  rounded
                  outlined
                  required
                  label="類別 *"
                  v-model="share.category"
                  :options="options"
                />
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="數量 *"
                  v-model="share.amount"
                ></q-input>
              </div>

              <div class="col-12 text-left ship q-pt-sm">
                <div>
                  <span class="shipping">運送方式：</span>
                </div>
                <div>
                  <q-option-group
                    class="shipping"
                    size="sm"
                    dense
                    inline
                    v-model="share.shipping"
                    :options="radios"
                  />
                </div>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  label="圖片說明"
                  v-model="share.description"
                  bottom-slots
                  counter
                  type="textarea"
                  :rules="[
                    val => !!val || '請輸入1-50個字',
                    val => val.length <= 50 || '最多輸入50個字'
                  ]"
                >
                  <template v-slot:hint>
                    請輸入1-50個字
                  </template>
                </q-input>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <img-inputer
                  v-model="share.addImg"
                  icon="img"
                  bottom-text="點擊或拖曳更換圖片"
                  placeholder="請選擇上傳圖片"
                  :max-size="1024"
                  bottom-slots
                  exceedSizeText="檔案大小不能超過"
                  accept="image/*"
                ></img-inputer>
              </div>

              <div class="mt-0 col-md-6 q-gutter-y-md "></div>
              <q-card-actions class="col-12" align="center">
                <q-btn rounded outline label="送出" type="submit" />
                <q-btn
                  rounded
                  outline
                  width="100px"
                  label="重設"
                  type="reset"
                />
              </q-card-actions>
            </q-card-section>
          </form>
        </q-card>
      </q-dialog>
    </q-page-container>
  </div>
</template>

<script>
export default {
  name: 'PageMember',
  data() {
    return {
      shareCard: false,
      editing: false,

      // 新增物資
      share: {
        addImg: null,

        item: '',

        shipping: '郵寄',
        category: '',
        description: '',
        amount: ''
      },
      images: [],
      mem: {},
      options: ['文具', '書籍', '玩具', '電器', '醫療', '其他'],
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
        }
      ]
    }
  },
  computed: {
    member() {
      return this.$store.state.member
    }
  },
  methods: {
    // 新增前台分享物資
    add() {
      // console.log(this.images)
      // console.log(this.donate.addImg)
      if (this.share.addImg.size > 1024 * 1024) {
        // alert('圖片太大')
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: '圖片太大'
        })
      } else if (!this.share.addImg.type.includes('image')) {
        // alert('檔案格式錯誤')
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: '檔案格式錯誤'
        })
      } else {
        const fd = new FormData()
        fd.append('member', this.share.member)
        fd.append('item', this.share.item)
        fd.append('shipping', this.share.shipping)
        fd.append('category', this.share.category)
        fd.append('amount', this.share.amount)
        fd.append('description', this.share.description)
        fd.append('image', this.share.addImg)
        this.axios
          .post(process.env.VUE_APP_API + '/shares/', fd)
          .then(res => {
            if (res.data.success) {
              // console.log(res.data)
              res.data.result.src =
                process.env.VUE_APP_API + '/shares/file/' + res.data.result.file
              res.data.result.edit = false

              // 物資名稱
              res.data.result.modelItem = res.data.result.item
              // 運送方式
              res.data.result.modelShipping = res.data.result.shipping
              // 物資類別
              res.data.result.modelCategory = res.data.result.category
              // 物資說明
              res.data.result.modelDescription = res.data.result.description
              res.data.result.title = res.data.result.description
              // 提供數量
              res.data.result.modelAmount = res.data.result.amount

              delete res.data.result.file
              delete res.data.result.description
              // 將新增的圖片塞進相簿陣列
              this.images.unshift(res.data.result)
              // 送出後清空表單
              this.share.addImg = null
              this.share.item = ''
              this.share.shipping = ''
              this.share.category = ''
              this.share.description = ''
              this.share.amount = ''
              this.shareCard = false
              // 送出後跳出成功訊息
              this.$q.notify({
                color: 'light-green',
                icon: 'fas fa-check-circle',
                message: '新增成功'
              })
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
      }
    },
    addReset() {
      this.share.addImg = null

      this.share.item = ''
      this.share.shipping = '郵寄'
      this.share.category = ''
      this.share.description = ''
      this.share.amount = ''
    },
    // 會員編輯、儲存、修改
    edit() {
      this.editing = true

      this.mem.modelName = this.mem.name
      this.mem.modelPhoneNum = this.mem.phoneNum
      this.mem.modelEmail = this.mem.email
      this.mem.modelAddress = this.mem.address
    },
    save() {
      this.axios
        .patch(process.env.VUE_APP_API + '/members/' + this.mem._id, {
          name: this.mem.modelName,
          phoneNum: this.mem.modelPhoneNum,
          email: this.mem.modelEmail,
          address: this.mem.modelAddress
        })
        .then(res => {
          if (res.data.success) {
            this.editing = false

            this.mem.name = this.mem.modelName
            this.mem.phoneNum = this.mem.modelPhoneNum
            this.mem.email = this.mem.modelEmail
            this.mem.address = this.mem.modelAddress

            this.$q.notify({
              color: 'light-green',
              icon: 'fas fa-check-circle',
              message: '保存成功'
            })
          } else {
            // alert(res.data.message)
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
    },
    cancel() {
      this.editing = false

      this.mem.modelName = this.mem.name
      this.mem.modelPhoneNum = this.mem.phoneNum
      this.mem.modelEmail = this.mem.email
      this.mem.modelAddress = this.mem.address
    },
    img(file) {
      return process.env.VUE_APP_API + '/donates/file/' + file
    }
  },
  // 叫出資料庫的所有東西
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/members/member/' + this.member.id)
      .then(res => {
        if (res.data.success) {
          this.mem = res.data.result
          // 編輯狀態
          this.editing = false

          this.mem.modelName = this.mem.name
          this.mem.modelPhoneNum = this.mem.phoneNum
          this.mem.modelEmail = this.mem.email
          this.mem.modelAddress = this.mem.address

          // console.log(this.mem)
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
  }
}
</script>
