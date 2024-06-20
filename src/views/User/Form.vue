<template>
  <header-title :module-name="module.name"></header-title>
  <n-card size="large" class="shadow">
    <n-form
      :label-width="80"
      ref="formRef"
      size="medium"
      :model="form"
      :rules="rules"
    >
      <div class="row">
        <n-form-item label="Name" path="name" class="col-md-6">
          <n-input v-model:value="form.name" placeholder="Input Name"/>
        </n-form-item>
        <n-form-item label="Name" path="name" class="col-md-6">
          <n-input v-model:value="form.username" placeholder="Input Username"/>
        </n-form-item>
        <n-form-item label="Email" path="email" class="col-md-6">
          <n-input v-model:value="form.email" placeholder="Input Email" />
        </n-form-item>
        <n-form-item label="Password" path="password" class="col-md-6">
          <n-input v-model:value="form.password" type="password" placeholder="Input Password"/>
        </n-form-item>
        <n-form-item label="Role" path="role" class="col-md-6">
          <n-select v-model:value="form.role" :options="roles" placeholder="Select Role" />
        </n-form-item>
      </div>
    </n-form>

    <div class="d-flex justify-content-end">
      <n-button @click="() => router.go(-1)" class="me-2">
        Cancel
      </n-button>
      <n-button @click="submit" :loading="loading" type="primary">
        Submit
      </n-button>
    </div>
  </n-card>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useMessage } from "naive-ui";
import Validation from '@/utils/validation'
import { useRoute, useRouter } from "vue-router";
import axios from 'axios'
import module from './meta.js'
import _ from '@/utils/general'

export default defineComponent({
  name: 'FormPage',
  setup() {
    const message = useMessage();
    const router = useRouter();
    const formRef = ref(null)
    const route = useRoute()
    const roles = ref([]);

    const loading = ref(false)

    const form = ref({
      name: '',
      email: '',
      username: '',
      password: '',
      role: ''
    })

    const rules = new Validation({
      name: "required",
      email: "required",
      username: "required",
      password: route.params.id ? "" : "required",
    })

    console.log(rules)

    const getRoles = async () => {
      try {
        const url = '/users/get_roles'
        const res = await axios.get(url)
        roles.value = res.data.data
        form.value.role = res.data.data[0].value

      } catch (error) {
        console.log(error)
        message.error('Something went wrong. Please check you data.')
      }
    }

    const load = async () => {
      try {
        const url = `${module.api_url}/${route.params.id}`
        const res = await axios.get(url)
        form.value = res.data.data
      } catch (error) {
        message.error('Something went wrong. Please check you data.')
      }
    }

    const submit = async (e) => {
      e.preventDefault();
      formRef.value?.validate(async (errors) => {
        loading.value = true
        if (!errors) {
          
          try {
            loading.value = true

            if(route.params.id) {
              await axios.put(`${module.api_url}/${route.params.id}`, form.value)
            } else {
              await axios.post(module.api_url, form.value)
            }

            message.success('Success')
            router.go(-1)
          } catch(error) {
            message.error(_.compileErrors(error.response.data.data))
          }

          loading.value = false

        } else {
          loading.value = false
          console.log(errors);
          message.error("Invalid");
        }
      });
      
    }

    onMounted(() => {
      getRoles()

      if(route.params.id) {
        load()
      }
    })

    return {
      loading,
      message,
      router,
      rules,
      roles,
      form,
      submit,
      formRef,
      module
    }; 
  }
});
</script>