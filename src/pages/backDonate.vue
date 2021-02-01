<template>
  <q-page id="backDonate" class="flex flex-start ">
    <q-page-container class="container-back100 q-my-none">
      <!-- 新增區 -->
      <q-btn
        class="add"
        round
        icon="fa fa-plus"
        size="md"
        @click="donateCard = true"
      />

      <!-- 標題區 -->
      <q-item id="title">
        <q-item-section avatar>
          <q-icon name="favorite" />
        </q-item-section>

        <q-item-section>物資捐贈管理</q-item-section>
      </q-item>

      <!-- 表格區 -->
      <q-table
        :filter="filter"
        :columns="titles"
        :data="this.images"
        row-key="name"
        :rows-per-page-options="[5, 8, 10]"
        :grid="$q.screen.xs"
      >
        <template v-slot:body="image">
          <q-tr>
            <q-td key="item">
              <q-input
                outlined
                filled
                v-if="image.row.edit"
                v-model="image.row.modelItem"
              />

              <q-item-label v-else :lines="1">
                {{ image.row.item }}
              </q-item-label>
            </q-td>

            <q-td key="requester">
              <q-input
                outlined
                filled
                v-if="image.row.edit"
                v-model="image.row.modelRequester"
              />

              <q-item-label v-else :lines="2">
                {{ image.row.requester }}
              </q-item-label>
            </q-td>

            <q-td key="category">
              <div class="text-pre-wrap"></div>
              <q-input
                outlined
                filled
                v-if="image.row.edit"
                v-model="image.row.modelCategory"
              />

              <q-item-label v-else :lines="1">
                {{ image.row.category }}
              </q-item-label>
            </q-td>

            <q-td key="spec">
              <div class="text-pre-wrap"></div>
              <q-input
                outlined
                filled
                v-if="image.row.edit"
                v-model="image.row.modelSpec"
              />

              <q-item-label v-else :lines="1">
                {{ image.row.spec }}
              </q-item-label>
            </q-td>

            <q-td key="description">
              <div class="text-pre-wrap"></div>
              <q-input
                outlined
                filled
                stack-label
                bottom-slots
                type="textarea"
                :rules="[val => val.length <= 50 || '最多輸入50個字']"
                v-if="image.row.edit"
                v-model="image.row.modelDescription"
              />

              <q-item-label v-else :lines="2">
                {{ image.row.title }}
              </q-item-label>
            </q-td>

            <q-td key="amount">
              <q-input
                outlined
                filled
                v-if="image.row.edit"
                v-model="image.row.modelAmount"
              />

              <q-item-label v-else :lines="1">
                {{ image.row.amount }}
              </q-item-label>
            </q-td>

            <q-td key="active">
              <q-btn
                v-if="!image.row.edit"
                @click="edit(image)"
                class="edit"
                outline
                rounded
              >
                <i class="fas fa-pen"></i>
              </q-btn>
              <q-btn
                v-if="!image.row.edit"
                @click="del(image)"
                class="del"
                outline
                rounded
              >
                <i class="fas fa-trash-alt"></i>
              </q-btn>
              <q-btn
                v-if="image.row.edit"
                @click="save(image)"
                class="save"
                outline
                rounded
              >
                <i class="fas fa-save"></i>
              </q-btn>
              <q-btn
                v-if="image.row.edit"
                @click="cancel(image)"
                class="cancel"
                outline
                rounded
              >
                <i class="fas fa-times"></i>
              </q-btn>
            </q-td>
          </q-tr>
        </template>

        <!-- filter -->
        <template v-slot:top-right>
          <q-input
            filled
            dense
            outlined
            v-model="filter"
            placeholder="請輸入關鍵字"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>

      <!-- dialog 彈出視窗 -->
      <!-- 新增 -->
      <q-dialog v-model="donateCard">
        <q-card id="donateCard">
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
                  v-model="donate.item"
                >
                </q-input>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="需求者 *"
                  v-model="donate.requester"
                >
                </q-input>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="規格 *"
                  v-model="donate.spec"
                ></q-input>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-select
                  rounded
                  outlined
                  required
                  label="類別 *"
                  v-model="donate.category"
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
                  v-model="donate.amount"
                ></q-input>
              </div>

              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  label="圖片說明"
                  v-model="donate.description"
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
                  v-model="donate.addImg"
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
  </q-page>
</template>

<script>
export default {
  name: 'PageDonate',
  data() {
    return {
      donateCard: false,
      filter: '',

      // 新增物資
      donate: {
        addImg: null,

        item: '',
        requester: '',
        spec: '',
        category: '',
        description: '',
        amount: ''
      },
      images: [],

      // 表格項目類別
      titles: [
        {
          name: 'item',
          required: true,
          label: '物資名稱',
          align: 'left',
          field: 'item',
          sortable: true
        },
        {
          name: 'requester',
          required: true,
          align: 'left',
          label: '需求單位',
          field: 'requester'
        },
        {
          name: 'category',
          required: true,
          align: 'left',
          label: '類別',
          field: 'category',
          sortable: true
        },
        {
          name: 'spec',
          required: true,
          align: 'left',
          label: '規格',
          field: 'spec'
        },

        {
          name: 'description',
          required: true,
          align: 'left',
          label: '需求說明',
          field: 'title'
        },
        {
          name: 'amount',
          required: true,
          align: 'left',
          label: '需求數量',
          field: 'amount',
          sortable: true
        },
        {
          name: 'active',
          required: true,
          align: 'left',
          label: ''
        }
      ],

      options: ['文具', '書籍', '玩具', '電器', '醫療', '其他']
    }
  },
  computed: {
    member() {
      return this.$store.state.member
    }
  },
  methods: {
    add() {
      // console.log(this.images)
      // console.log(this.donate.addImg)
      if (this.donate.addImg.size > 1024 * 1024) {
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: '圖片太大'
        })
      } else if (!this.donate.addImg.type.includes('image')) {
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: '檔案格式錯誤'
        })
      } else {
        const fd = new FormData()
        fd.append('member', this.donate.member)
        fd.append('item', this.donate.item)
        fd.append('requester', this.donate.requester)
        fd.append('spec', this.donate.spec)
        fd.append('category', this.donate.category)
        fd.append('amount', this.donate.amount)
        fd.append('description', this.donate.description)
        fd.append('image', this.donate.addImg)
        this.axios
          .post(process.env.VUE_APP_API + '/donates/', fd)
          .then(res => {
            if (res.data.success) {
              // console.log(res.data)
              res.data.result.src =
                process.env.VUE_APP_API +
                '/donates/file/' +
                res.data.result.file
              res.data.result.edit = false

              // 物資名稱
              res.data.result.modelItem = res.data.result.item
              // 需求單位
              res.data.result.modelRequester = res.data.result.requester
              // 物資規格
              res.data.result.modelSpec = res.data.result.spec
              // 物資類別
              res.data.result.modelCategory = res.data.result.category
              // 需求說明
              res.data.result.modelDescription = res.data.result.description
              res.data.result.title = res.data.result.description
              // res.data.result.model = res.data.result.description
              // 需求數量
              res.data.result.modelAmount = res.data.result.amount

              delete res.data.result.file
              delete res.data.result.description
              // 將新增的圖片塞進相簿陣列
              this.images.unshift(res.data.result)
              // 送出後清空表單
              this.donate.addImg = null
              this.donate.item = ''
              this.donate.requester = ''
              this.donate.spec = ''
              this.donate.category = ''
              this.donate.description = ''
              this.donate.amount = ''
              this.donateCard = false
              // 送出後跳出成功訊息
              this.$q.notify({
                color: 'light-green',
                icon: 'fas fa-check-circle',
                message: '新增成功'
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
      }
    },
    addReset() {
      this.donate.addImg = null
      this.donate.item = ''
      this.donate.requester = ''
      this.donate.spec = ''
      this.donate.category = ''
      this.donate.description = ''
      this.donate.amount = ''
    },
    edit(image) {
      // console.log(image.modelItem)
      image.row.edit = true

      image.modelItem = image.row.item
      image.modelRequester = image.row.requester
      image.modelSpec = image.row.spec
      image.modelCategory = image.row.category
      image.modelDescription = image.row.title
      // image.model = image.row.title
      image.modelAmount = image.row.amount
    },
    del(image) {
      this.axios
        .delete(process.env.VUE_APP_API + '/donates/' + image.row._id)
        .then(res => {
          if (res.data.success) {
            this.images.splice(image.rowIndex, 1)
            this.$q.notify({
              color: 'light-green',
              icon: 'fas fa-check-circle',
              message: '刪除成功'
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
          this.$q.notify({
            color: 'red-6',
            icon: 'fas fa-exclamation-circle',
            message: error.response.data.message
          })
        })
    },
    save(image) {
      this.axios
        .patch(process.env.VUE_APP_API + '/donates/' + image.row._id, {
          item: image.row.modelItem,
          requester: image.row.modelRequester,
          spec: image.row.modelSpec,
          category: image.row.modelCategory,
          description: image.row.modelDescription,
          amount: image.row.modelAmount
          // description: image.title
          // image.row.title = image.model
        })
        .then(res => {
          if (res.data.success) {
            console.log(image)
            image.row.edit = false
            image.row.item = image.row.modelItem
            image.row.requester = image.row.modelRequester
            image.row.spec = image.row.modelSpec
            image.row.category = image.row.modelCategory
            image.row.title = image.row.modelDescription
            image.row.amount = image.row.modelAmount

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
    cancel(image) {
      image.row.edit = false
      image.row.modelItem = image.row.item
      image.row.modelRequester = image.row.requester
      image.row.modelSpec = image.row.spec
      image.row.modelCategory = image.row.category
      image.row.modelDescription = image.row.title
      // image.model = image.row.title
      image.row.modelAmount = image.row.amount
    }
  },
  // 叫出資料庫的所有東西
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/donates/')
      .then(res => {
        if (res.data.success) {
          this.images = res.data.result
            .map(image => {
              image.src =
                process.env.VUE_APP_API + '/donates/file/' + image.file
              image.edit = false

              // 物資名稱
              image.modelItem = image.item
              // 需求單位
              image.modelRequester = image.requester
              // 物資類別
              image.modelCategory = image.category
              // 物資規格
              image.modelSpec = image.spec
              // 需求說明
              image.title = image.description
              image.modelDescription = image.description
              // 需求數量
              image.modelAmount = image.amount

              delete image.file
              delete image.description
              return image
            })
            .reverse()
          // console.log(this.images)
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
  }
}
</script>
