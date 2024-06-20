<template>
  <n-layout embedded>
    <div class="login" style="height: 100vh">
      <div class="container">
        <div class="row justify-content-center">
          <n-card style="max-width: 500px; margin-top: 150px">
            <n-form
              ref="formRef"
              :label-width="80"
              size="medium"
            >
              <n-form-item label="Username" path="username">
                <n-input v-model:value="form.username" placeholder="Input Username" />
              </n-form-item>
              <n-form-item label="Password" path="password">
                <n-input
                  v-model:value="form.password"
                  type="password"
                  placeholder="Input Password"
                  autocomplete="false"
                />
              </n-form-item>
              <n-button
                @click="login"
                style="width: 100%"
                size="large"
                :loading="loading"
                type="primary"
              >
                Login
              </n-button>
            </n-form>
          </n-card>
        </div>
      </div>
    </div>
  </n-layout>
</template>

<script>
import { useMessage } from "naive-ui";
import { ref, defineComponent } from "vue";
// import general from '@/utility/general.js'
import Validation from "@/utils/validation.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const message = useMessage();
    const store = useStore()
    const loading = ref(false)

   return { router, message, store, loading }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      this.loading = true
      const res = await this.store.dispatch('auth/login', this.form)
      this.loading = false
      if(res.status !== 200) this.message.error(res.data.data)
      else {
        window.location.href = '/'
      }
    }
  },
  mounted() {
    if(localStorage.getItem('token') !== null) {
      this.router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
/* .login {
  background-image: url("../assets/bglogin.jpg");
  height: 100vh !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
} */
</style>
