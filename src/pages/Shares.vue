<template>
  <div id="shares">
    <q-page-container class="container">
      <!-- <p>{{ id }}</p> -->
      <!-- 麵包屑 -->
      <q-breadcrumbs>
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>

        <q-breadcrumbs-el icon="home" label="幕幕首頁" to="/" />
        <q-breadcrumbs-el label="募募分享" to="/Share" />
        <q-breadcrumbs-el :label="shares.item" />
      </q-breadcrumbs>
      <br />
      <div class="row">
        <div class="col-12 col-lg-6 q-pa-md">
          <q-img :src="shares.src" />
        </div>
        <div class="col-12 col-lg-6 q-px-lg q-py-lg">
          <p>{{ shares.item }}</p>

          <p>{{ '類別：' + shares.category }}</p>
          <p>{{ '數量：' + shares.amount }}</p>
          <p>{{ '說明：' + shares.description }}</p>

          <q-separator class="q-my-lg" />
          <div class="text-center">
            <q-btn
              rounded
              size="md"
              class="no-wrap q-mt-sm q-mx-xs"
              color="warning"
              @click="addShare(shares)"
            >
              &nbsp;<i class="fa fa-plus"></i>
              &nbsp;提出需求&nbsp;
            </q-btn>
            <q-btn
              rounded
              size="md"
              class="no-wrap q-mt-sm q-mx-xs"
              color="mu03"
              to="/S_Cart"
              disabled
            >
              &nbsp;<i class="fa fa-comment-dots"></i>
              &nbsp;查看提出的需求&nbsp;
            </q-btn>
          </div>
        </div>
      </div>
    </q-page-container>
  </div>
</template>

<script>
export default {
  name: 'PageShares',
  data() {
    return {
      shares: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    addShare(shares) {
      // 呼叫 mutations 修改狀態
      this.$store.commit('addShare', shares)
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/shares/' + this.id)
      .then(res => {
        if (res.data.success) {
          this.shares = res.data.result
          this.shares.src =
            process.env.VUE_APP_API + '/shares/file/' + res.data.result.file
          console.log(this.shares)
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
  }
}
</script>
