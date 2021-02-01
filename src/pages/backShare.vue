<template>
  <q-page id="backShare" class="flex flex-start">
    <q-page-container class="container-back100 q-my-none">
      <!-- 標題區 -->
      <q-item id="title">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>

        <q-item-section>募募分享管理</q-item-section>
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

            <q-td>
              <q-item-label :lines="1">
                {{ image.row.member }}
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
                v-model="image.row.modelShipping"
              />
              <q-item-label v-else :lines="1">
                {{ image.row.shipping }}
              </q-item-label>
            </q-td>

            <q-td key="description">
              <div class="text-pre-wrap"></div>
              <q-input
                outlined
                filled
                stack-label
                type="textarea"
                label="請輸入50個字以內"
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
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'PageShare',
  data() {
    return {
      donateCard: false,

      filter: '',

      // 新增物資
      share: {
        addImg: null,

        item: '',
        shipping: '',
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
          label: '物品名稱',
          align: 'left',
          field: 'item',
          sortable: true
        },
        {
          name: 'member',
          required: true,
          label: '會員帳號',
          align: 'left',
          field: 'member',
          sortable: true
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
          name: 'shipping',
          required: true,
          align: 'left',
          label: '運送方式',
          field: 'shipping'
        },
        {
          name: 'description',
          required: true,
          align: 'left',
          label: '物品說明',
          field: 'title'
        },
        {
          name: 'amount',
          required: true,
          align: 'left',
          label: '提供數量',
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
    edit(image) {
      // console.log(image.modelItem)
      image.row.edit = true

      image.row.modelItem = image.row.item
      image.row.modelShipping = image.row.shipping
      image.row.modelCategory = image.row.category
      image.row.modelDescription = image.row.title
      image.row.modelAmount = image.row.amount
    },
    del(image) {
      this.axios
        .delete(process.env.VUE_APP_API + '/shares/' + image.row._id)
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
        .patch(process.env.VUE_APP_API + '/shares/' + image.row._id, {
          item: image.row.modelItem,
          shipping: image.row.modelShipping,
          category: image.row.modelCategory,
          description: image.row.modelDescription,
          amount: image.row.modelAmount
        })
        .then(res => {
          if (res.data.success) {
            console.log(image)
            image.row.edit = false
            image.row.item = image.row.modelItem
            image.row.shipping = image.row.modelShipping
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
      image.row.modelShipping = image.row.shipping
      image.row.modelCategory = image.row.category
      image.row.modelDescription = image.row.title
      image.row.modelAmount = image.row.amount
    }
  },
  // 叫出資料庫的所有東西
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/shares/member')
      .then(res => {
        if (res.data.success) {
          this.images = res.data.result
            .map(image => {
              image.src = process.env.VUE_APP_API + '/shares/file/' + image.file
              image.edit = false

              // 物品名稱
              image.modelItem = image.item
              // 運送方式
              image.modelShipping = image.shipping
              // 物品類別
              image.modelCategory = image.category
              // 物品說明
              image.title = image.description
              image.modelDescription = image.description
              // 提供數量
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
        // alert(error.response.data.message)
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: error.response.data.message
        })
      })
  }
}
</script>
