<template>
  <div id="index">
    <!-- content -->
    <q-page-container class="mainCarousel">
      <!-- 輪播圖 -->
      <VueSlickCarousel v-bind="mainCarousel">
        <div><img class="w-100 " :src="'./images/main_01.jpg'" /></div>
        <div><img class="w-100 " :src="'./images/main_02.jpg'" /></div>
        <div><img class="w-100 " :src="'./images/main_03.jpg'" /></div>
        <div><img class="w-100 " :src="'./images/main_04.jpg'" /></div>
      </VueSlickCarousel>
    </q-page-container>
    <!-- 瀏覽數量 -->
    <q-page-container class="counter container">
      <div class="row justify-center">
        <div
          class=" row flex-column col-4 flex-md-row col-md-12 text-center justify-center "
        >
          <div class="col-auto col-md-auto q-px-md q-pt-md q-pb-sm">
            <div class="count">
              <i left class="fas fa-walking"> 瀏覽人數</i>
              <div>{{ getRandomInt() }}</div>
            </div>
          </div>
          <div class="col-auto col-md-auto q-px-md q-pt-md q-pb-sm border">
            <div class="count">
              <i left class="fas fa-box-open"> 募集數量</i>
              <div>{{ donateMain.length }}</div>
            </div>
          </div>
          <div class="col-auto col-md-auto q-px-md q-pt-md q-pb-sm ">
            <div class="count">
              <i left class="fas fa-heart"> 分享數量</i>
              <div>{{ shareMain.length }}</div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
    <!-- news -->
    <q-page-container class="container">
      <div>
        <!-- 最新消息 -->
        <div class="col-12 col-md-6">
          <span class="maintitle">最新消息</span>
          <div class="row">
            <div class="col-12 col-md-6 col-xl-4 q-pa-xs">
              <a href="#">
                <q-card class="shadow-0">
                  <q-img :src="'./images/news00.jpg'"> </q-img>
                </q-card>
              </a>
            </div>
            <div class="col-12 col-md-6 col-xl-4 q-pa-xs">
              <a href="#">
                <q-card class="new-news shadow-0">
                  <q-img :src="'./images/news01.jpg'"> </q-img>
                </q-card>
              </a>
            </div>
            <div class="col-12 col-md-6 col-xl-4 q-pa-xs">
              <a href="#">
                <q-card class="new-news shadow-0">
                  <q-img :src="'./images/news02.jpg'"> </q-img>
                </q-card>
              </a>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
    <q-page-container class="container">
      <div>
        <!-- 活動消息 -->
        <div class="col-12 col-md-6">
          <span class="maintitle">活動消息</span>
          <div class="row">
            <div class="col-12 col-md-6 col-xl-4 q-pa-xs">
              <a href="#">
                <q-card class="shadow-0">
                  <q-img :src="'./images/campaign00.jpg'"> </q-img>
                </q-card>
              </a>
            </div>
            <div class="col-12 col-md-6 col-xl-4 q-pa-xs">
              <a href="#">
                <q-card class="new-news shadow-0">
                  <q-img :src="'./images/campaign01.jpg'"> </q-img>
                </q-card>
              </a>
            </div>
            <div class="col-12 col-md-6 col-xl-4 q-pa-xs">
              <a href="#">
                <q-card class="new-news shadow-0">
                  <q-img :src="'./images/campaign03.jpg'"> </q-img>
                </q-card>
              </a>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>

    <!-- 物資捐贈 q-card -->
    <q-page-container class="container pt-0">
      <span class="maintitle">物資捐贈</span>
      <VueSlickCarousel v-bind="settingsSM" class="SM">
        <div v-for="(dMain, index) in donateMain" :key="index">
          <q-card
            class="Dcard q-ma-xs"
            @click="$router.push('/Donation/' + dMain._id)"
          >
            <q-img :src="dMain.src" />
            <q-card-section class="q-pt-none q-pb-md">
              <div class="text-center itemSM q-mt-sm txt">
                {{ dMain.item }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel v-bind="settingsMD" class="MD">
        <div v-for="(dMain, index) in donateMain" :key="index">
          <q-card
            class="Dcard q-ma-xs"
            @click="$router.push('/Donation/' + dMain._id)"
          >
            <q-img :src="dMain.src" />
            <q-card-section class="q-pt-none q-pb-md">
              <div class="text-center itemSM q-mt-sm txt">
                {{ dMain.item }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel v-bind="settingsLG" class="LG">
        <div v-for="(dMain, index) in donateMain" :key="index">
          <q-card
            class="Dcard q-ma-xs"
            @click="$router.push('/Donation/' + dMain._id)"
          >
            <q-img :src="dMain.src" />
            <q-card-section class="q-pt-none q-pb-md">
              <div class="text-center itemSM q-mt-sm txt">
                {{ dMain.item }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </VueSlickCarousel>
    </q-page-container>
    <!-- 募募分享 q-card -->
    <q-page-container class="container pt-0">
      <span class="maintitle">募募分享</span>
      <VueSlickCarousel v-bind="settingsSM" class="SM">
        <div v-for="(sMain, index) in shareMain" :key="index">
          <q-card
            class="Scard q-ma-xs"
            @click="$router.push('/Shares/' + sMain._id)"
          >
            <q-img :src="sMain.src" />
            <q-card-section class="q-pt-none q-pb-sm">
              <div class="text-center itemSM q-mt-sm txt">
                {{ sMain.item }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel v-bind="settingsMD" class="MD">
        <div v-for="(sMain, index) in shareMain" :key="index">
          <q-card
            class="Scard q-ma-xs"
            @click="$router.push('/Shares/' + sMain._id)"
          >
            <q-img :src="sMain.src" />
            <q-card-section class="q-pt-none q-pb-sm">
              <div class="text-center itemSM q-mt-sm txt">
                {{ sMain.item }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel v-bind="settingsLG" class="LG">
        <div v-for="(sMain, index) in shareMain" :key="index">
          <q-card
            class="Scard q-ma-xs"
            @click="$router.push('/Shares/' + sMain._id)"
          >
            <q-img :src="sMain.src" />
            <q-card-section class="q-pt-none q-pb-sm">
              <div class="text-center itemSM q-mt-sm txt">
                {{ sMain.item }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </VueSlickCarousel>
    </q-page-container>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'PageIndex',
  data() {
    return {
      donateMain: [
        {
          requester: '',
          item: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          requester: '',
          item: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          requester: '',
          item: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          requester: '',
          item: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          requester: '',
          item: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          requester: '',
          item: '',
          src: 'https://picsum.photos/400/400/?random=3'
        }
      ],
      shareMain: [
        {
          item: '',
          amount: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          item: '',
          amount: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          item: '',
          amount: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          item: '',
          amount: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          item: '',
          amount: '',
          src: 'https://picsum.photos/400/400/?random=3'
        },
        {
          item: '',
          amount: '',
          src: 'https://picsum.photos/400/400/?random=3'
        }
      ],

      /* 大圖輪播 */
      mainCarousel: {
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
      },
      /* 捐贈、 分享輪播 */
      settingsSM: {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 2500
      },
      settingsMD: {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 2500
      },
      settingsLG: {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 2500
      }
    }
  },
  components: {
    VueSlickCarousel
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(1000))
    }
  },
  mounted() {
    // 物資捐贈的資料庫
    this.axios
      .get(process.env.VUE_APP_API + '/donates')
      .then(res => {
        if (res.data.success) {
          this.donateMain = res.data.result.map(dMain => {
            dMain.src = process.env.VUE_APP_API + '/donates/file/' + dMain.file
            return dMain
          })

          console.log(this.donateMain)
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
    // 物資分享的資料庫
    this.axios
      .get(process.env.VUE_APP_API + '/shares/member')
      .then(res => {
        if (res.data.success) {
          this.shareMain = res.data.result.map(sMain => {
            sMain.src = process.env.VUE_APP_API + '/shares/file/' + sMain.file
            return sMain
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
        this.$q.notify({
          color: 'red-6',
          icon: 'fas fa-exclamation-circle',
          message: error.response.data.message
        })
      })
  }
}
</script>
