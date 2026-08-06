import {createApp} from 'vue'
import Harness from './Harness.vue'
import './harness.css'
import {installErrorCapture} from './harness/errors'
import {divider, restoredFromReload} from './harness/log'

const app = createApp(Harness)
installErrorCapture(app)

if (restoredFromReload) {
  divider('page reloaded (HMR / refresh) — log restored from sessionStorage')
}

app.mount('#app')
