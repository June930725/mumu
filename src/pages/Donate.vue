<template>
  <div id="donate">
    <q-page-container class="container">
      <q-btn class="basket" round icon="fa fa-shopping-basket" to="/D_Cart">
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

            <!-- 醫療 -->
            <q-item
              clickable
              v-ripple
              :active="tab === 'hospital'"
              @click="
                tab = 'hospital'
                filter = '醫療'
              "
              active-class="my-menu-link"
              class="q-ma-xs"
            >
              <div class="flex q-mx-auto">
                <q-item-section>
                  <i class="fa fa-stethoscope text-center"></i>
                </q-item-section>

                <q-item-section>醫療</q-item-section>
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
              <div class="row fit items-center q-mx-auto ">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title txt">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="stationery">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title txt">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                    <!-- 按鈕區 -->
                  </q-btn>
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="book">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title txt">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                    <!-- 按鈕區 -->
                  </q-btn>
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="game">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title txt">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                    <!-- 按鈕區 -->
                  </q-btn>
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="power">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title txt">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                    <!-- 按鈕區 -->
                  </q-btn>
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="hospital">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center txt">
                          <!-- 商品標題 -->
                          <div class="title">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                    <!-- 按鈕區 -->
                  </q-btn>
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
            </q-tab-panel>

            <q-tab-panel name="else">
              <div class="row fit items-center q-mx-auto q-px-xs">
                <q-card
                  class="col-12 col-md-6 col-lg-4 q-pb-md"
                  v-for="(dImg, idx) in filterDonate"
                  :key="idx"
                >
                  <q-btn class="card_btn" :to="'/Donation/' + dImg._id">
                    <q-card-section>
                      <!-- 圖片區 -->
                      <q-img :src="dImg.src" />
                      <!-- 內文區 -->
                      <q-card-section>
                        <!-- 需求單位 -->
                        <div class="required q-mt-xs txt">
                          {{ dImg.requester }}
                        </div>

                        <div class="items-center">
                          <!-- 商品標題 -->
                          <div class="title txt">
                            {{ dImg.item }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card-section>
                  </q-btn>
                  <!-- 按鈕區 -->
                  <q-card-actions>
                    <q-btn
                      class="D_addBtn"
                      rounded
                      size="md"
                      color="warning no-wrap cart"
                      @click="addBasket(dImg)"
                    >
                      &nbsp;<i class="fa fa-plus "></i>
                      &nbsp;加入捐贈籃&nbsp;
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
  name: 'PageDonate',
  data() {
    return {
      tab: 'all',
      donateImg: [],
      filter: '',
      count: 0
    }
  },
  computed: {
    member() {
      return this.$store.state.member
    },
    filterDonate() {
      return this.donateImg.filter(donate => {
        if (this.filter === '') {
          return true
        } else {
          return donate.category === this.filter
        }
      })
    }
  },
  methods: {
    addBasket(dImg) {
      // 呼叫 mutations 修改狀態
      this.$store.commit('addBasket', dImg)
      // this.count++
    }
  },
  // 叫出資料庫的所有東西
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/donates')
      .then(res => {
        if (res.data.success) {
          this.donateImg = res.data.result
            .map(dImg => {
              dImg.src = process.env.VUE_APP_API + '/donates/file/' + dImg.file
              return dImg
            })
            .reverse()
          // console.log(this.donateImg)
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
