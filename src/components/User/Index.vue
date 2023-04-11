<template>
  <div>
    <div>
      <h1>User Component</h1>
    </div>
    <div class="flex-center-horizontal">
      <div>
        <h2>Formulario</h2>
        <div>
          <label for="name">Nombre: </label>
          <input v-model="form.name" name="name" type="text" />
        </div>
        <div>
          <label for="age">Edad: </label>
          <input v-model="form.age" name="age" type="number" />
        </div>
        <div>
          <button type="button" @click="onClick">Guardar</button>
        </div>
      </div>
      <div>
        <h2>Lista de usuarios</h2>
        <div v-for="userItem in user.userList.value" :key="userItem.uuid">
          <p>{{ userItem.name }}</p>
          <p>{{ userItem.age }}</p>
          <button type="button" @click="removeUser(userItem.uuid)">Remover</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserComponent',
})
</script>

<script lang="ts" setup>
import { reactive } from 'vue'
import { User } from '@/interface/user'
import { useUser } from '@/hook/user'

const user = useUser()

const form = reactive<User>({
  age: 0,
  name: '',
})

const onClick = () => {
  user.addUser(form)
}

const removeUser = (uuid: User['uuid']) => {
  user.removeUser(uuid)
}
const v4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
</script>

<style lang="sass" scoped src="./styles.sass" />
