# Vue 3 Component Store

A simple, extensible component store for managing component logic, inspired by [@ngrx/signals](https://ngrx.io/guide/signals "@ngrx/signals") for angular.

ComponentStore is a stand-alone library that helps manage local/component state. It's an alternative to the reactive composables approach. The component store uses composables and dependency injection, along with an extensible mechanism that makes it powerful for reusing composables and extending store functionality in a simple and flexible way.

## why component store and not composables ?
1. **No Conflict with Composables**: The component store internally uses the composable approach and provide/inject. When using composables, reactive variables are recreated each time, preventing a standalone state for your component. If the state is outside the composable, it is shared across all instances, which can break the application. The component store solves this by maintaining a standalone state.
2. **Powerful and Easy to Use**: The component store allows any composable to be used as an extension, enhancing its power and ease of use.
3. **Separation of View and Logic**: By separating view and logic, you can divide your component into smaller parts, maintaining single responsibility. This eliminates the need to pass many props or events between the root component and its children, as the logic is handled in the component store. Both the root and child components can access the store to change state or execute functions like API requests or localStorage operations.

Powerful and Easy to Use: The component store allows any composable to be used as an extension, enhancing its power and ease of use.

Separation of View and Logic: By separating view and logic, you can divide your component into smaller parts, maintaining single responsibility. This eliminates the need to pass many props or events between the root component and its children, as the logic is handled in the component store. Both the root and child components can access the store to change state or execute functions like API requests or localStorage operations.


# Code Samples
In `counter.store.ts` create a new component store using the createComponentStore function. This returns two functions to provide and use the instance in child components. Use the providedStore function only at the root component (each call creates a new instance).

```javascript
export const [provideCounterStore, useCounterStore] = createComponentStore(
  (store) => {
    const count = ref(0)
    function increment () {
      count.value++
    }
    function decrement () {
      count.value--
    }
    return {count, increment, decrement}
  },
  (soter) => {
    const double = computed(() => store.count * 2)
    return {double}
  },
  (store => {
    onMounted(() => {
      console.log('mounted', store.double)
      store.increment()
      console.log('incremented', store.double)
    })
  })
)
```

# Extensions
The component store can be extended by adding new functions or properties to the store. This is done by passing a function to the createComponentStore function. The function receives the store instance and returns an object with the new functions or properties.

```javascript
export function withRequestStatus() {
  return () => {
    const loading = ref(false)
    const error = ref('')
    const initializing = ref(true)
    function startLoading() {
      loading.value = true
      error.value = ''
    }
    function stopLoading() {
      loading.value = false
    }
    function setError(err: string) {
      error.value = err
    }
    function startInitializing() {
      initializing.value = true
    }
    function stopInitializing() {
      initializing.value = false
    }

    return {loading, error, initializing, startLoading, stopLoading, setError, startInitializing, stopInitializing}
  }
}
```

### Using Extensions
```javascript
export const [provideUserStore, useUserStore] = createComponentStore(
  withRequestStatus(),
  (store => {
    const userService = useUserService()
    const userInfo = ref<UserInfo|null>(null)
    
    onMounted(async () => {
      store.startInitializing()
        try {
          const user = await userService.getUser()
          userInfo.value = user
        } catch (err) {
          store.setError(err)
        } finally {
          store.stopInitializing()
        }
    })
    async function updateUser() {
      store.startLoading()
      try {
        const user = await userService.updateUser(userInfo.value)
        userInfo.value = user
      } catch (err) {
        store.setError(err)
      } finally {
        store.stopLoading()
      }
    }
    return {userInfo}
  })
)
```
# how to use store
you can simply create the store instance for your component by calling the **useCounterStore** function

### root component
```javascript
<script setup lang="ts">
  import {provideUserStore} from '@/user.store'
  const store = provideUserStore()
</script>

<template>
  <div v-if="store.initializing">initializing...</div>
  <div v-else-if="store.error">{{store.error}}</div>
  <div v-else-if="store.userInfo">
    <input v-model="store.userInfo.name" />
    <UserAddress />
    <button @click="store.updateUser()" disabled="store.loading"> Update </button>
</div>
```
### child components
for children component you must use the **useUserStore** function to access the store instance
```javascript
<script setup lang="ts">
  import {useUserStore} from '@/user.store'
  const store = useUserStore()
</script>

<template>
  <div class"address-form">
    <input v-model="store.userInfo.country" />
    <input v-model="store.userInfo.city" />
    <input v-model="store.userInfo.street" />
    <input v-model="store.userInfo.address" />
  </div>
</template>
```
