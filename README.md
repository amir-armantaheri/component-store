# Vue 3 Component Store

A simple, extensible component store for managing component logic, inspired by [@ngrx/signals](https://ngrx.io/guide/signals '@ngrx/signals') for angular.

ComponentStore is a stand-alone library that helps manage local/component state. It's an alternative to the reactive composables approach. The component store uses composables and dependency injection, along with an extensible mechanism that makes it powerful for reusing composables and extending store functionality in a simple and flexible way.

## why component store and not composables ?

1. **No Conflict with Composables**: The component store internally uses the composable approach and provide/inject. When using composables, reactive variables are recreated each time, preventing a standalone state for your component. If the state is outside the composable, it is shared across all instances, which can break the application. The component store solves this by maintaining a standalone state.
2. **Powerful and Easy to Use**: The component store allows any composable to be used as an extension, enhancing its power and ease of use.
3. **Separation of View and Logic**: By separating view and logic, you can divide your component into smaller parts, maintaining single responsibility. This eliminates the need to pass many props or events between the root component and its children, as the logic is handled in the component store. Both the root and child components can access the store to change state or execute functions like API requests or localStorage operations.
4. **shared logic between UI components** : consider a complex component like datepicker that may need multiple different component for different UI or different functionality. so using component store you can easily share the logic between them which will make everything resuable and easy to add feature or even fixing a bug.

Powerful and Easy to Use: The component store allows any composable to be used as an extension, enhancing its power and ease of use.

Separation of View and Logic: By separating view and logic, you can divide your component into smaller parts, maintaining single responsibility. This eliminates the need to pass many props or events between the root component and its children, as the logic is handled in the component store. Both the root and child components can access the store to change state or execute functions like API requests or localStorage operations.

for better typescript support enable **strictFunctionTypes** in you tsconfig file

# how to use

In `counter.store.ts` create a new component store using the componentStore function. This returns two functions to provide and use the instance in child components. Use the providedStore function only at the root component (each call creates a new instance).

```javascript
export const [provideCounterStore, useCounterStore] = componentStore((store) => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }
  const double = computed(() => store.count * 2)
  onMounted(() => {
    console.log('mounted', store.double)
    store.increment()
    console.log('incremented', store.double)
  })
  return {count, double, increment, decrement}
})
```

# Extensions

The component store can be extended by adding new functions or properties to the store. This is done by passing a function to the componentStore function. The function receives the store instance and returns an object with the new functions or properties.
you also can use storeFeature function to combine several composables/extensions/features and create a single reusable store feature.

---

**you always have access to properties/state or functions of previous features so the order of adding features are important**

---

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

export function withEntity<T>() {
  return () => {
    const entity = ref<T | null>(null)
    const entities = ref<T[]>([])
    function setEntity(value: T| null) {
      entity.value = value
    }

    function setEntities(value: T[]) {
      entities.value = value
    }
    function resetAll() {
      entity.value = null
      entities.value = []
    }

    return {entity, entities, setEntity, setEntities, resetAll}
  }
}

```

```javascript
export function newStoreFeature() {
  return storeFeature(
    withRequestStatus(),
    withEntity<UserInfo>(),
    (store) => {
      onMounted(async () => {
        const {users} = await getUsers()
        setData(users[0], users)
      })
      function setData(selecteduser: UserInfo, allUsers: UserInfo[]) {
        store.setEntity(selectedUser)
        store.setEntities(allUsers)
      }
      return {
        setData
      }
    }

  )
}
```

### typescript support

component store has been written by typescript so you should not be worried about typescript support. but in some case it could be possible some features are dependant to each other. for example a spinner feature which is dependant to withRequestStatus feature because of "loading" state. in order to make sure there is already a feature which has provided the "loading" state you can define a type for store argument of spinner feature that expect a loading property like this:

```javascript
export function withSpinner() {
  return (store: {loading: boolean}) => {
    console.log(store.loading)
    watch(() => store.loading, (isLoading) => {
      // trigger loading
    })
  }
}
```

in this case if you don't provide a feature before withSpinner that has provided "loading" property, you will face a typescript error. so awesome typescript support for dependant features.

### Initial State

The component store can have an initial state that is passed as an argument to the provide function. This is useful when your store state is dependent on props or anything else.
in order can pass initial state for your store you need to define initial state type to the first store feature argument like this:

```javascript
const [provideUserStore, useUserStore] = componentStore(
  (store: {superAdmin: boolean,isLogin: boolean}) => {
    const allowAccess = computed(() => store.superAdmin || store.isLogin)
    return {allowAccess}
  },
  withRequestStatus(),
  withEntity<UserInfo>()
)

const userStore = provideUserStore({superAdmin: false, isLogin: false})
```
if you don't pass initial state to the provide function, typescript will throw an error.
### Using Extensions

```javascript
export const [provideUserStore, useUserStore] = componentStore(
  newStoreFeature(),
  (store) => {
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

you can simply create the store instance for your component by calling the **provideUserStore** function

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
