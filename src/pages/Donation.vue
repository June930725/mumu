<template>
  <div id="donation">
    <q-page-container class="container">
      <!-- 麵包屑 -->
      <q-breadcrumbs>
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" />
        </template>

        <q-breadcrumbs-el icon="home" label="幕幕首頁" to="/" />
        <q-breadcrumbs-el label="物資捐贈" to="/Donate" />
        <q-breadcrumbs-el :label="donation.item" />
      </q-breadcrumbs>
      <br />
      <div class="row">
        <div class="col-12 col-lg-6 q-pa-md">
          <q-img :src="donation.src" />
        </div>
        <div class="col-12 col-lg-6 q-px-lg q-py-xl">
          <p>{{ donation.item }}</p>
          <p>{{ '需求單位：' + donation.requester }}</p>
          <p>{{ '物資規格：' + donation.spec }}</p>
          <p>{{ '需求說明：' + donation.description }}</p>
          <p>{{ '需求類別：' + donation.amount }}</p>
          <p>{{ '物資規格：' + donation.category }}</p>
          <q-separator class="q-my-lg" />
          <div class="text-center">
            <q-btn
              rounded
              size="md"
              class="no-wrap q-mt-sm q-mx-xs"
              color="warning"
              @click="addBasket(donation)"
            >
              &nbsp;<i class="fa fa-plus"></i>
              &nbsp;加入捐贈籃&nbsp;
            </q-btn>
            <q-btn
              rounded
              size="md"
              class="no-wrap q-mt-sm q-mx-xs"
              color="mu03"
              to="/D_Cart"
            >
              &nbsp;<i class="fa fa-shopping-basket"></i>
              &nbsp;查看我的捐贈籃&nbsp;
            </q-btn>
          </div>
        </div>
      </div>
    </q-page-container>
  </div>
</template>

<script>
export default {
  name: 'PageDonation',
  data() {
    return {
      donation: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    addBasket(donation) {
      // 呼叫 mutations 修改狀態
      this.$store.commit('addBasket', donation)
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/donates/' + this.id)
      .then(res => {
        if (res.data.success) {
          this.donation = res.data.result
          this.donation.src =
            process.env.VUE_APP_API + '/donates/file/' + res.data.result.file
          // console.log(this.donation)
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
