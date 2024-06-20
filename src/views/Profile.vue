<template>
  <div class="mb-3">
    <div style="font-weight: 500; color: #aaaaaa">Profile Management</div>
    <div style="font-size: 2em; font-weight: bold">Edit Profile</div>
  </div>
  <n-card size="large" class="shadow">
    <n-form
      :label-width="80"
      ref="formRef"
      size="medium"
      :model="form"
      :rules="rules"
    >
      <div class="row">
        <n-form-item label="Name" path="name" class="col-md-4">
          <n-input v-model:value="form.name" placeholder="Input Name"/>
        </n-form-item>
        <n-form-item label="Email" path="email" class="col-md-4">
          <n-input v-model:value="form.email" placeholder="Input Email" />
        </n-form-item>
        <n-form-item label="Role" path="role" class="col-md-4">
          <n-select v-model:value="form.role" :options="roleOptions" placeholder="Select Role" />
        </n-form-item>
      </div>
    </n-form>

    <div class="d-flex justify-content-end">
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
import { useRouter } from "vue-router";
import axios from 'axios'
import module from '@/views/User/meta.js'
import { useStore } from "vuex";

export default defineComponent({
  name: 'FormPage',
  setup() {
    const message = useMessage();
    const router = useRouter();
    const store = useStore()
    const formRef = ref(null)

    const loading = ref(false)

    const form = ref({
      name: '',
      email: '',
      status: 'active',
      role: 'admin'
    })

    const rules = new Validation({
      name: "required",
      email: "required"
    })

    const roleOptions = [
      {
        label: 'Admin',
        value: 'admin'
      }
    ]

    const user = store.getters['auth/user']

    const load = async () => {
      try {
        
        const url = `${module.api_url}?email=${user.email}`
        const res = await axios.get(url)
        form.value = res.data.data[0]
      } catch (error) {
        message.error('Something went wrong. Please check you data.')
      }
    }

    const submit = (e) => {
      e.preventDefault();
      formRef.value?.validate(async (errors) => {
        loading.value = true
        if (!errors) {
          
          try {
            loading.value = true
            const data = await axios.put(module.api_url, form.value)
            message.success('Success')
            router.go(-1)
          } catch(error) {
            message.error('Something went wrong. Please check you data.')
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
      load()
    })

    return {
      loading,
      message,
      router,
      rules,
      roleOptions,
      form,
      submit,
      formRef,
      module
    }; 
  }
});
</script>