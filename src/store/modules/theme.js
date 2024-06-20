import { darkTheme } from 'naive-ui'
const theme = {
    namespaced: true,
    state: () => ({
        theme: localStorage.getItem('theme') == 'dark' ? darkTheme : null
    }),
    mutations: {
        setTheme(state) {
            const theme = state.theme == null ? 'dark' : null
            localStorage.setItem('theme', theme)
            state.theme = theme ? darkTheme : null
        }
    }
}

export default theme