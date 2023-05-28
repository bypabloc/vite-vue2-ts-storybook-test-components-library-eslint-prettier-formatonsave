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
          <input v-model="form.name" data-testid="name" name="name" type="text" />
        </div>
        <div>
          <label for="age">Edad: </label>
          <input v-model="form.age" data-testid="age" name="age" type="number" />
        </div>
        <div>
          <button data-testid="button" name="button" type="button" @click="onClick">Guardar</button>
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

<script lang="ts">
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
</script>

<style lang="sass" scoped src="./styles.sass" />
