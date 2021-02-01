<template>
  <div id="share">
    <q-page-container class="container">
      <q-btn class="basket" round icon="fa fa-comment-dots" to="/S_Cart" disabled>
        <p v-if="count === 0"></p>
        <q-badge v-else color="red" floating>{{ count }}</q-badge>
      </q-btn>
      <div class="row">
        <!-- 標籤區 -->
        <div class="list col-12 col-md-3 ">
          <q-list v-model="tab">
            <!-- 全部 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'all'"
              @click="
                tab = 'all'
                filter = ''
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-inbox text-center"></i>
                </q-item-section>

                <q-item-section>全部</q-item-section>
              </div>
            </q-item>

            <!-- 文具 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'stationery'"
              @click="
                tab = 'stationery'
                filter = '文具'
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-pen text-center"></i>
                </q-item-section>

                <q-item-section>文具</q-item-section>
              </div>
            </q-item>

            <!-- 書籍 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'book'"
              @click="
                tab = 'book'
                filter = '書籍'
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-book text-center"></i>
                </q-item-section>

                <q-item-section>書籍</q-item-section>
              </div>
            </q-item>

            <!-- 玩具 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'game'"
              @click="
                tab = 'game'
                filter = '玩具'
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-gamepad text-center"></i>
                </q-item-section>

                <q-item-section>玩具</q-item-section>
              </div>
            </q-item>

            <!-- 電器 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'power'"
              @click="
                tab = 'power'
                filter = '電器'
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-plug text-center"></i>
                </q-item-section>

                <q-item-section>電器</q-item-section>
              </div>
            </q-item>

            <!-- 其他 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'else'"
              @click="
                tab = 'else'
                filter = '其他'
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-th text-center"></i>
                </q-item-section>

                <q-item-section>其他</q-item-section>
              </div>
            </q-item>
          </q-list>
        </div>
        <!-- 卡片區 -->
        <div id="card" class="col-12 col-md-9 q-mb-lg">
          <q-tab-panels v-model="tab">
            <q-tab-panel name="all">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(sImg, idx) in filterShare"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Shares/' + sImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="sImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ sImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions>
                    <q-btn
                      class="S_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(sImg)"
                    >
                      &nbsp;<i class="fa fa-comment-dots"></i>
                      &nbsp;提出需求&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="stationery">
              <div class="row fit items-center q-col-gutter-md">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(sImg, idx) in filterShare"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Shares/' + sImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="sImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ sImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions style="pointer-events:none">
                    <q-btn
                      class="S_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(sImg)"
                    >
                      &nbsp;<i class="fa fa-comment-dots"></i>
                      &nbsp;提出需求&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="book">
              <div class="row fit items-center q-col-gutter-md">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(sImg, idx) in filterShare"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Shares/' + sImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="sImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ sImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions style="pointer-events:none">
                    <q-btn
                      class="S_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(sImg)"
                    >
                      &nbsp;<i class="fa fa-comment-dots"></i>
                      &nbsp;提出需求&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="game">
              <div class="row fit items-center q-col-gutter-md">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(sImg, idx) in filterShare"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Shares/' + sImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="sImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ sImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions style="pointer-events:none">
                    <q-btn
                      class="S_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(sImg)"
                    >
                      &nbsp;<i class="fa fa-comment-dots"></i>
                      &nbsp;提出需求&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="power">
              <div class="row fit items-center q-col-gutter-md">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(sImg, idx) in filterShare"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Shares/' + sImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="sImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ sImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions style="pointer-events:none">
                    <q-btn
                      class="S_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(sImg)"
                    >
                      &nbsp;<i class="fa fa-comment-dots"></i>
                      &nbsp;提出需求&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="else">
              <div class="row fit items-center q-col-gutter-md">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(sImg, idx) in filterShare"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Shares/' + sImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="sImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ sImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions style="pointer-events:none">
                    <q-btn
                      class="S_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(sImg)"
                    >
                      &nbsp;<i class="fa fa-comment-dots"></i>
                      &nbsp;提出需求&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-page-container>
  </div>
</template>

<script>
export default {
  name: 'PageShare',
  data() {
    return {
      tab: 'all',
      shareImg: [],
      filter: '',
      count: 0
    }
  },
  computed: {
    member() {
      return this.$store.state.member
    },
    filterShare() {
      return this.shareImg.filter(share => {
        if (this.filter === '') {
          return true
        } else {
          return share.category === this.filter
        }
      })
    }
  },
  methods: {
    addBasket(sImg) {
      // 呼叫 mutations 修改狀態
      this.$store.commit('addBasket', sImg)
      this.count++
    }
  },
  // 叫出資料庫的所有東西
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/shares/member/')
      .then(res => {
        if (res.data.success) {
          this.shareImg = res.data.result
            .map(sImg => {
              sImg.src = process.env.VUE_APP_API + '/shares/file/' + sImg.file
              return sImg
            })
            .reverse()
          console.log(this.shareImg)
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
