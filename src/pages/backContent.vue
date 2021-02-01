<template>
  <q-page id="backContent" class="flex flex-start">
    <q-page-container class="container-back75 q-my-none">
      <!-- 標題區 -->
      <q-item id="title">
        <q-item-section avatar>
          <q-icon name="list" />
        </q-item-section>

        <q-item-section>網站內容管理</q-item-section>
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
      </q-table>
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'PageNews',
  data() {
    return {
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
