<template>
  <div id="appHeader">
    <q-header reveal class="text-dark bg-white" height-hint="98">
      <!-- 576px -->
      <div class="btn-group-sm">
        <q-btn
          unelevated
          rounded
          icon="login"
          v-if="member.id.length === 0"
          @click="logCard = true"
        />
        <q-btn
          unelevated
          rounded
          icon="r_person_add"
          v-if="member.id.length === 0"
          @click="regCard = true"
        />
        <q-btn
          unelevated
          rounded
          icon="account_circle"
          v-if="member.id.length > 0 && member.right === false"
          to="/Member"
        />
        <q-btn
          unelevated
          rounded
          icon="logout"
          v-if="member.id.length > 0"
          @click="logout"
        />
      </div>
      <!-- 992px -->
      <div class="btn-group-lg">
        <q-btn
          outline
          rounded
          label="登入"
          icon="login"
          v-if="member.id.length === 0"
          @click="logCard = true"
        />
        &nbsp;
        <q-btn
          unelevated
          rounded
          label="註冊"
          icon="r_person_add"
          v-if="member.id.length === 0"
          @click="regCard = true"
        />
        <q-btn
          unelevated
          rounded
          label="會員中心"
          icon="account_circle"
          v-if="member.id.length > 0 && member.right === false"
          to="/Member"
        />
        <q-btn
          unelevated
          rounded
          label="登出"
          icon="logout"
          v-if="member.id.length > 0"
          @click="logout"
        />
      </div>
      <!-- logo -->
      <q-toolbar>
        <q-toolbar-title align="center">
          <a @click.prevent="$router.push('/')">
            <!-- <img class="q-mt-lg" src="../assets/mumu-03.svg" width="220" /> -->
            <img class="q-mt-lg" src="../assets/mumu-07.svg" width="220" />
          </a>
        </q-toolbar-title>
      </q-toolbar>
      <!-- 導覽列 -->
      <q-tabs align="center">
        <q-route-tab to="/News" label="最新消息" />
        <q-route-tab to="/Donate" label="物資捐贈" />
        <q-route-tab to="/Share" label="募募分享" />
        <q-route-tab to="/About" label="關於我們" />
        <q-route-tab
          to="/admin"
          label="後台管理"
          v-if="member.right === true"
        />
      </q-tabs>
      <!-- dialog 彈出視窗 -->
      <!-- 登入 -->
      <q-dialog v-model="logCard">
        <q-card id="loginCard">
          <q-card-section>
            <div text-overline>會員登入</div>
          </q-card-section>
          <form @submit.prevent="signin" @reset="inReset">
            <q-card-section class="q-gutter-y-md column">
              <q-input
                autofocus
                rounded
                outlined
                required
                label="帳號 *"
                v-model="log.account"
                type="text"
                :state="accountState"
              ></q-input>
              <q-input
                rounded
                outlined
                required
                label="密碼 *"
                v-model="log.password"
                :type="isPwd ? 'password' : 'text'"
                :state="passwordState"
              >
                <!-- 密碼的小眼睛 -->
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="isPwd = !isPwd"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-checkbox v-model="checkbox" label="記住帳號" />

              <q-card-actions align="center">
                <q-btn rounded outline label="登入" type="submit" />
              </q-card-actions>
            </q-card-section>
          </form>
        </q-card>
      </q-dialog>

      <!-- 註冊 -->
      <q-dialog v-model="regCard">
        <q-card id="regCard">
          <q-card-section>
            <div text-overline>會員註冊</div>
          </q-card-section>
          <form @submit.prevent="signup" @reset="regReset">
            <q-card-section class="row">
              <div class="mt-0 col-12 col-sm-6 q-gutter-y-md ">
                <q-input
                  autofocus
                  rounded
                  outlined
                  required
                  label="帳號 *"
                  v-model="reg.account"
                  type="text"
                  :state="regAccountState"
                >
                </q-input>
              </div>
              <!-- <small>請輸入4-20個字</small> -->
              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  required
                  label="密碼 *"
                  v-model="reg.password"
                  :type="isPwd ? 'password' : 'text'"
                  :state="regPasswordState"
                >
                  <!-- 密碼的小眼睛 -->
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      @click="isPwd = !isPwd"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  label="姓名 *"
                  v-model="reg.name"
                ></q-input>
              </div>
              <div class="col-12 col-sm-6 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  label="手機 *"
                  v-model="reg.phoneNum"
                ></q-input>
              </div>
              <div class="col-12 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  label="Email *"
                  v-model="reg.email"
                ></q-input>
              </div>
              <div class="col-12 q-gutter-y-md">
                <q-input
                  rounded
                  outlined
                  label="地址 *"
                  v-model="reg.address"
                ></q-input>
              </div>
              <!-- <a href="#"><small>忘記密碼？</small></a> -->
              <div class="col-12 q-gutter-y-md items-center">
                <q-card-actions class="col-12" align="center">
                  <q-btn rounded outline label="註冊" type="submit" />
                  <q-btn
                    rounded
                    outline
                    label="重設"
                    type="reset"
                    class="reset"
                  />
                </q-card-actions>
              </div>
            </q-card-section>
          </form>
        </q-card>
      </q-dialog>
    </q-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logCard: false,
      regCard: false,

      // 記住帳號
      checkbox: false,

      // login
      log: {
        account: '',
        password: ''
      },

      // registered
      reg: {
        account: '',
        password: '',
        name: '',
        phoneNum: '',
        email: '',
        address: '',
        right: false
      },

      isPwd: true
    }
  },
  computed: {
    member() {
      return this.$store.state.member
    },
    accountState() {
      if (this.log.account.length === 0) {
        return null
      } else if (
        this.log.account.length >= 4 &&
        this.log.account.length <= 20
      ) {
        return true
      } else {
        return false
      }
    },
    passwordState() {
      if (this.log.password.length === 0) {
        return null
      } else if (
        this.log.password.length >= 4 &&
        this.log.password.length <= 20
      ) {
        return true
      } else {
        return false
      }
    },
    regAccountState() {
      if (this.reg.account.length === 0) {
        return null
      } else if (
        this.reg.account.length >= 4 &&
        this.reg.account.length <= 20
      ) {
        return true
      } else {
        return false
      }
    },
    regPasswordState() {
      if (this.reg.password.length === 0) {
        return null
      } else if (
        this.reg.password.length >= 4 &&
        this.reg.password.length <= 20
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    signin() {
      if (this.accountState && this.passwordState) {
        this.axios
          .post(process.env.VUE_APP_API + '/members/login', this.log)
          .then(res => {
            if (res.data.success) {
              // 修改狀態
              this.$store.commit('login', res.data.result)
              console.log(res.data.result)
              if (this.checkbox === true) {
                // 成功後清空表單 ( checkbox === true ) 記住帳號，只要清空密碼
                this.log.password = ''
              } else {
                // 成功後清空表單
                this.log.account = ''
                this.log.password = ''
              }

              // 關閉 logCard
              this.logCard = false
              // 導向到指定頁面
              this.$router.push('/Member')
            } else {
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
      }
    },
    inReset() {
      this.log.account = ''
      this.log.password = ''
    },
    signup() {
      if (this.regAccountState && this.regPasswordState) {
        this.axios
          .post(process.env.VUE_APP_API + '/members/', this.reg)
          .then(res => {
            if (res.data.success) {
              // 關閉 regCard
              this.regCard = false
              // alert('註冊成功')
              this.$q.notify({
                color: 'light-green',
                icon: 'fas fa-check-circle',
                message: '註冊成功'
              })
              // 送出後清空表單
              this.reg.account = ''
              this.reg.password = ''
              this.reg.name = ''
              this.reg.phoneNum = ''
              this.reg.email = ''
              this.reg.address = ''
            } else {
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
      }
    },
    regReset() {
      this.reg.account = ''
      this.reg.password = ''
      this.reg.name = ''
      this.reg.phoneNum = ''
      this.reg.email = ''
      this.reg.address = ''
    },
    logout() {
      this.axios
        .delete(process.env.VUE_APP_API + '/members/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            // alert('已登出')
            this.$q.notify({
              color: 'light-green',
              icon: 'fas fa-check-circle',
              message: '已登出'
            })
            // 清除 vuex
            this.$store.commit('logout')
            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$q.notify({
              color: 'red-6',
              icon: 'fas fa-exclamation-circle',
              message: res.data.message
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是200，直接 alert 錯誤訊息
          // alert(error.response.data.message)
          this.$q.notify({
            color: 'red-6',
            icon: 'fas fa-exclamation-circle',
            message: error.response.data.message
          })
        })
    },
    heartbeat() {
      this.axios
        .get(process.env.VUE_APP_API + '/members/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.member.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              // alert('登入時效已過，請重新登入')
              this.$q.notify({
                color: 'red-6',
                icon: 'fas fa-exclamation-circle',
                message: '登入時效已過，請重新登入'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          // alert('發生錯誤')
          this.$q.notify({
            color: 'red-6',
            icon: 'fas fa-exclamation-circle',
            message: '發生錯誤'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted() {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
