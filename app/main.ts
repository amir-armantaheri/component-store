import {createApp} from 'vue'
import App from './App.vue'
export interface ChildCmpProps {
  name: string
  id: number
}
const app = createApp(App)
app.mount('#app')
