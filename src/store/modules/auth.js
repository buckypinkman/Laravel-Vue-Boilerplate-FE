import axios from 'axios'

const auth = {
    namespaced: true,
    state: () => ({
        user: localStorage.getItem('user') || ''
    }),
    actions: {
        async login(ctx, payload) {
            try {
                const res = await axios.post('/login', payload)
                ctx.commit('SET_USER', {
                    email: payload.email,
                    name: res.data.data.name,
                    role: res.data.data.role
                })
                localStorage.setItem('token', res.data.data.access_token)
                return res
            } catch (error) {
                return error.response
            }
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        }
    },
    getters: {
        user: state => typeof state.user == 'object' ? state.user : JSON.parse(state.user)
    }
}

export default auth