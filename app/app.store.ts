import {computed, ref} from 'vue'
import {componentStore, storeFeature} from '../src'

function newFeature() {
  return storeFeature((store) => {
    return {name: 'hasan'}
  }, withLoading())
}

const [provideStore, useStore] = componentStore(
  (store) => {
    return {
      name: 'hasan',
      loading: false
    }
  },
  withStats(),
  (store) => {
    const loading = ref(false)
    function startLoading() {
      loading.value = true
    }
    function stopLoading() {
      loading.value = false
    }
    return {
      loading,
      startLoading,
      stopLoading
    }
  }
)

function withLoading() {
  return () => {
    const isLoading = computed(() => {
      return false
    })
    return {
      loading: isLoading,
      isNew: false
    }
  }
}

function withStats() {
  return (store: {loading: boolean; name: string}) => {
    const isLoading = computed(() => {
      return store.loading
    })
    return {
      isLoading
    }
  }
}
const store = provideStore()
