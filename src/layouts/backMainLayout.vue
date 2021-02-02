<template>
  <q-layout view="hHh lpR fFf" id="backMainLayout">
    <!-- header -->
    <q-header>
      <q-toolbar>
        <q-btn flat dense round @click="left = !left" icon="menu" />
        <!-- 後台管理系統 -->
        <q-toolbar-title>
          <q-btn class="adminPagebtn" to="/admin">後台管理系統</q-btn>
        </q-toolbar-title>
        <div class="q-gutter-sm row items-center no-wrap">
          <!-- 回首頁 -->
          <q-btn rounded icon="home" to="/" />
          <!-- 登出按鈕 -->
          <q-btn unelevated rounded icon="logout" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- leftDrawer -->
    <q-drawer v-model="left" show-if-above side="left" content-class="bg-mu03">
      <q-list class="text-white">
        <!-- 最新消息管理 -->
        <q-item
          disable
          clickable
          v-ripple
          active-class="activelink"
          to="/admin/News"
        >
          <q-item-section avatar>
            <q-icon name="r fiber_new" />
          </q-item-section>

          <q-item-section>最新消息管理</q-item-section>
        </q-item>
        <!-- 物資捐贈管理 -->
        <q-item clickable v-ripple active-class="activelink" to="/admin/Donate">
          <q-item-section avatar>
            <q-icon name="r favorite" />
          </q-item-section>

          <q-item-section>物資捐贈管理</q-item-section>
        </q-item>
        <!-- 募募分享管理 -->
        <q-item clickable v-ripple active-class="activelink" to="/admin/Share">
          <q-item-section avatar>
            <q-icon name="r cached" />
          </q-item-section>

          <q-item-section>募募分享管理</q-item-section>
        </q-item>
        <!-- 網站內容管理 -->
        <q-item
          disable
          clickable
          v-ripple
          active-class="activelink"
          to="/admin/Content"
        >
          <q-item-section avatar>
            <q-icon name="r list" />
          </q-item-section>

          <q-item-section>網站內容管理</q-item-section>
        </q-item>
        <!-- 會員管理 -->
        <q-item clickable v-ripple active-class="activelink" to="/admin/Member">
          <q-item-section avatar>
            <q-icon name="r account_circle" />
          </q-item-section>

          <q-item-section>會員資料管理</q-item-section>
        </q-item>
        <!-- 訂單管理 -->
        <q-item disable v-ripple active-class="activelink" to="/admin/Order">
          <q-item-section avatar>
            <q-icon name="r grade" />
          </q-item-section>

          <q-item-section>會員訂單管理</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container class="bg-mu04">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    }
  },
  methods: {
    logout() {
      this.axios
        .delete(process.env.VUE_APP_API + '/members/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
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
        // console.log(error)
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: error.response.data.message
        })
    }
  }
</script>
