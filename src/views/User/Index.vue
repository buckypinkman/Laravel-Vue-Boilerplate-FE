<template>
  <div>
    <header-title :module-name="module.name"></header-title>
    <div class="d-flex justify-content-end mb-3">
      <n-input placeholder="Search" class="me-2" v-model:value="search" v-debounce:400ms="loadSearch" style="width: 250px">
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
      <router-link :to="{name: module.route+'-create'}">
        <n-button strong secondary type="primary">
          Create New
        </n-button>
      </router-link>
    </div>
    <div style="overflow: scroll">
      <n-data-table
        remote
        :columns="columns"
        :data="list"
        :loading="loading"
        :pagination="pagination"
        :row-key="(row) => row.id"
        @update:page="load"
        style="min-width: 1100px"
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { NDataTable } from "naive-ui";
import { SearchOutline } from "@vicons/ionicons5";
import { h } from 'vue'
import { NButton, useDialog, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import axios from 'axios'
import module from './meta.js'

const dialog = useDialog()
const message = useMessage();
const router = useRouter()
const search = defineModel({default: ''})

const columns = [
  { title: 'Name' , key: 'name', searchable: true },
  { title: 'Email', key: 'email', searchable: true },
  { title: 'Username', key: 'username', searchable: true },
  {
      title: 'Action',
      key: 'actions',
      searchable: false,
      render (row) {
        return [
          h(
            NButton,
            {
              strong: true,
              type: 'primary',
              size: 'small',
              onClick: () => router.push({ name: module.route+'-edit', params: { id: row.id } })
            },
            { default: () => 'Edit' }
          ),
          h(
            NButton,
            {
              strong: true,
              type: 'error',
              size: 'small',
              class: 'ms-2',
              onClick: () => destroy(row)
            },
            { default: () => 'Delete' }
          )
        ]
      }
  }
]

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 8,
  showSizePicker: true,
  pageSizes: [5, 8, 10, 16, 50, 100],
  onChange: (page) => {
    pagination.page = page
    load()
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    load()
  },
  prefix ({ itemCount }) {
    return `Rows total: ${itemCount}`
  }
})

const loading = ref(false)

const list = ref([])

const loadSearch = () => {
  load()
}

const load = async (page = pagination.page, limit = pagination.pageSize) => {
  loading.value = true
  try {

    const searchColumns = columns.filter(col => col.searchable).map(col => col.key).join(',')

    const url = `${module.api_url}?page=${page}&limit=${limit}&search=${search.value}&search_columns=${searchColumns}`
    console.log(url)
    const result = await axios.get(url)
    const { data } = result.data

    list.value = data.data

    pagination.page = data.current_page ?? 1
    pagination.pageCount = data.last_page ?? 1
    pagination.pageSize = data.per_page ?? 10
    pagination.itemCount = data.total ?? 10

    loading.value = false

  } catch (error) {
    console.log(error)
    loading.value = false
  }

}

const destroy = (row) => {
  dialog.warning({
    title: 'Confirm',
    content: 'Are you sure?',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: async () => {
      const res = await axios.delete(`${module.api_url}/${row.id}`)
      if(res.data.success) {
        load()
        message.success('Success delete')
      }
    },
  })
}

onMounted(() => {
  load()
})
</script>

