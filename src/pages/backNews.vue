<template>
  <q-page id="backNews" class="flex flex-center">
    <q-page-container class="container-back75 q-my-none">
      <!-- 新增區 -->
      <q-btn
        class="add"
        round
        icon="fa fa-plus"
        size="md"
        @click="newsCard = true"
      />

      <!-- 標題區 -->
      <q-item id="title">
        <q-item-section avatar>
          <q-icon name="fiber_new" />
        </q-item-section>

        <q-item-section>最新消息管理</q-item-section>
      </q-item>

      <!-- 表格區 -->
      <q-table
        :filter="filter"
        :columns="titles"
        :data="this.images"
        row-key="name"
        :rows-per-page-options="[5, 7, 10, 0]"
      >
        <template v-slot:body="image">
          <q-tr>
            <q-td key="item">
              <q-input
                v-if="image.edit"
                v-model="image.row.item"
                dense
                autofocus
                counter
              />
              <p v-else>{{ image.row.item }}</p>
            </q-td>

            <q-td key="requester" :props="image">
              <q-input
                v-if="image.edit"
                type="text"
                v-model="image.row.requester"
                dense
                autofocus
              />
              <p v-else>{{ image.row.requester }}</p>
            </q-td>

            <q-td key="category" :props="image">
              <div class="text-pre-wrap"></div>
              <q-input
                v-if="image.edit"
                type="text"
                v-model="image.row.category"
                dense
                autofocus
              />
              <p v-else>{{ image.row.category }}</p>
            </q-td>

            <q-td key="spec" :props="image">
              <div class="text-pre-wrap"></div>
              <q-input
                v-if="image.edit"
                type="text"
                v-model="image.row.spec"
                dense
                autofocus
              />
              <p v-else>{{ image.row.spec }}</p>
            </q-td>

            <q-td key="active">
              <q-btn v-if="!image.edit" @click="edit(image)">
                <i class="fas fa-pen"></i>
              </q-btn>
              <q-btn v-if="!image.edit" @click="del(image)">
                <i class="fas fa-trash-alt"></i>
              </q-btn>
              <q-btn v-if="image.edit" @click="save(image)">
                <i class="fas fa-save"></i>
              </q-btn>
              <q-btn v-if="image.edit" @click="cancel(image)">
                <i class="fas fa-times"></i>
              </q-btn>
            </q-td>
          </q-tr>
        </template>

        <!-- filter -->
        <template v-slot:top-right>
          <q-input
            rounded
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <!-- edit -->
        <!-- <template v-slot:body-cell-active="image">
          <div class="flex no-wrap justify-center self-center ">
            <q-btn v-if="!image.edit" @click="edit(image)">
              <i class="fas fa-pen"></i>
            </q-btn>
            <q-btn v-if="!image.edit" @click="del(image, index)">
              <i class="fas fa-trash-alt"></i>
            </q-btn>
            <q-btn v-if="image.edit" @click="save(image)">
              <i class="fas fa-save"></i>
            </q-btn>
            <q-btn v-if="image.edit" @click="cancel(image)">
              <i class="fas fa-times"></i>
            </q-btn>
          </div>
        </template> -->
      </q-table>

      <!-- dialog 彈出視窗 -->
      <!-- 新增 -->
      <!-- <q-dialog v-model="newsCard">
        <q-card id="newsCard">
          <q-card-section>
            <div text-overline>新增物資需求</div>
          </q-card-section>
          <form @submit.prevent="add" @reset="addReset">
            <q-card-section class="column row">
              <div class="mt-0 col q-gutter-y-md ">
                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="物品名稱 *"
                  v-model="donate.item"
                >
                </q-input>
              </div>
              <div class="col col-md-6 q-gutter-y-md ">
                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="需求者 *"
                  v-model="donate.requester"
                >
                </q-input>

                <q-input
                  rounded
                  outlined
                  required
                  type="text"
                  label="規格 *"
                  v-model="donate.spec"
                ></q-input>
              </div>

              <div class="mt-0 col q-gutter-y-md ">
                <q-input
                  rounded
                  outlined
                  required
                  label="圖片說明"
                  v-model="donate.description"
                  bottom-slots
                  type="textarea"
                  :state="descState"
                >
                  <template v-slot:hint>
                    請輸入200個字以內
                  </template>
                </q-input>

                <img-inputer
                  v-model="donate.addImg"
                  icon="img"
                  size="large"
                  bottom-text="點擊或拖曳更換圖片"
                  placeholder="請選擇上傳圖片"
                  :max-size="1024"
                  exceedSizeText="檔案大小不能超過"
                  accept="image/*"
                ></img-inputer>
              </div>
              <q-card-actions class="col-12" align="center">
                <q-btn rounded outline label="送出" type="submit" />
                <q-btn rounded outline label="重設" type="reset" />
              </q-card-actions>
            </q-card-section>
          </form>
        </q-card>
      </q-dialog> -->
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'PageNews',
  data() {
    return {
      newsCard: false,
      filter: '',

      // 表格項目類別
      titles: [
        {
          name: 'date',
          required: true,
          label: '發佈日期',
          align: 'left',
          field: 'date'
        },
        {
          name: 'news',
          required: true,
          label: '標題',
          align: 'left',
          field: 'news'
        },

        {
          name: 'content',
          required: true,
          label: '內文',
          align: 'left',
          field: 'content'
        }
      ],
      data: [
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        },
        {
          date: 'Date',
          news: 'Frozen Yogurt',
          content: 'asdfghjkl'
        }
      ]
    }
  }
}
</script>
