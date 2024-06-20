import { createStore } from 'vuex'
import theme from '@/store/modules/theme'
import auth from '@/store/modules/auth'

export default createStore({
  modules: {
    theme,
    auth
  }
})
