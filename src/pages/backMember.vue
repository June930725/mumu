<template>
  <q-page id="backMember" class="flex flex-start">
    <q-page-container class="container-back100 q-my-none">
      <!-- 標題區 -->
      <q-item id="title">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>

        <q-item-section>會員資料管理</q-item-section>
      </q-item>

      <!-- 表格區 -->
      <q-table
        :filter="filter"
        :columns="titles"
        :data="this.members"
        row-key="name"
        :rows-per-page-options="[5, 8, 10]"
        :grid="$q.screen.xs"
      >
        <template v-slot:body="member">
          <q-tr>
            <q-td key="account">
              <q-item-label :lines="1">
                {{ member.row.account }}
              </q-item-label>
            </q-td>

            <q-td key="name">
              <q-input
                outlined
                filled
                v-if="member.row.edit"
                v-model="member.row.modelName"
              />
              <q-item-label v-else :lines="1">
                {{ member.row.name }}
              </q-item-label>
            </q-td>

            <q-td key="phoneNum">
              <div class="text-pre-wrap"></div>
              <q-input
                outlined
                filled
                v-if="member.row.edit"
                v-model="member.row.modelPhoneNum"
              />
              <q-item-label v-else :lines="1">
                {{ member.row.phoneNum }}
              </q-item-label>
            </q-td>

            <q-td key="email">
              <div class="text-pre-wrap"></div>
              <q-input
                outlined
                filled
                v-if="member.row.edit"
                v-model="member.row.modelEmail"
              />
              <q-item-label v-else :lines="1">
                {{ member.row.email }}
              </q-item-label>
            </q-td>

            <q-td key="address">
              <q-input
                outlined
                filled
                v-if="member.row.edit"
                v-model="member.row.modelAddress"
              />

              <q-item-label v-else :lines="1">
                {{ member.row.address }}
              </q-item-label>
            </q-td>

            <q-td key="active">
              <q-btn
                v-if="!member.row.edit"
                @click="edit(member)"
                class="edit"
                outline
                rounded
              >
                <i class="fas fa-pen"></i>
              </q-btn>
              <q-btn
                v-if="!member.row.edit"
                @click="del(member)"
                class="del"
                outline
                rounded
              >
                <i class="fas fa-trash-alt"></i>
              </q-btn>
              <q-btn
                v-if="member.row.edit"
                @click="save(member)"
                class="save"
                outline
                rounded
              >
                <i class="fas fa-save"></i>
              </q-btn>
              <q-btn
                v-if="member.row.edit"
                @click="cancel(member)"
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
  name: 'PageMember',
  data() {
    return {
      filter: '',

      // 表格項目類別
      titles: [
        {
          name: 'account',
          required: true,
          label: '帳號',
          align: 'left',
          field: 'account'
        },
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: 'name'
        },
        {
          name: 'phoneNum',
          required: true,
          label: '手機',
          align: 'left',
          field: 'phoneNum'
        },
        {
          name: 'email',
          required: true,
          label: 'email',
          align: 'left',
          field: 'email'
        },
        {
          name: 'address',
          required: true,
          label: '地址',
          align: 'left',
          field: 'address'
        },
        {
          name: 'active',
          required: true,
          align: 'left',
          label: ''
        }
      ],
      members: []
    }
  },
  computed: {
    member() {
      return this.$store.state.member
    }
  },
  methods: {
    edit(member) {
      member.row.edit = true

      member.modelName = member.row.name
      member.modelPhoneNum = member.row.phoneNum
      member.modelEmail = member.row.email
      member.modelAddress = member.row.address
    },
    del(member) {
      this.axios
        .delete(process.env.VUE_APP_API + '/members/' + member.row._id)
        .then(res => {
          if (res.data.success) {
            this.members.splice(member.rowIndex, 1)
            this.$q.notify({
              color: 'light-green',
              icon: 'fas fa-check-circle',
              message: '刪除成功'
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
          // alert(error.response.data.message)
          this.$q.notify({
            color: 'red-6',
            icon: 'fas fa-exclamation-circle',
            message: error.response.data.message
          })
        })
    },
    save(member) {
      this.axios
        .patch(process.env.VUE_APP_API + '/members/' + member.row._id, {
          name: member.row.modelName,
          phoneNum: member.row.modelPhoneNum,
          email: member.row.modelEmail,
          address: member.row.modelAddress
        })
        .then(res => {
          if (res.data.success) {
            // console.log(member)
            member.row.edit = false

            member.row.name = member.row.modelName
            member.row.phoneNum = member.row.modelPhoneNum
            member.row.email = member.row.modelEmail
            member.row.address = member.row.modelAddress

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
    cancel(member) {
      member.row.edit = false

      member.modelName = member.row.name
      member.modelPhoneNum = member.row.phoneNum
      member.modelEmail = member.row.email
      member.modelAddress = member.row.address
    }
  },
  // 叫出資料庫的會員資料
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/members/member/')
      .then(res => {
        if (res.data.success) {
          this.members = res.data.result
            .map(member => {
              member.edit = false

              member.modelName = member.name
              member.modelPhoneNum = member.phoneNum
              member.modelEmail = member.email
              member.modelAddress = member.address
              return member
            })
            .reverse()
          // console.log(this.members)
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
