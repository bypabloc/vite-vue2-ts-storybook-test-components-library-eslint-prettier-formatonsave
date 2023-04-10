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
          <input type="text" name="name" v-model="form.name">
        </div>
        <div>
          <label for="age">Edad: </label>
          <input type="number" name="age" v-model="form.age">
        </div>
        <div>
          <button
            type="button"
            @click="onClick"
          >
            Guardar
          </button>
        </div>
      </div>
      <div>
        <h2>Lista de usuarios</h2>
        <div v-for="userItem in user.userList.value" :key="userItem.uuid">
          <p>{{ userItem.name }}</p>
          <p>{{ userItem.age }}</p>
          <button
            type="button"
            @click="removeUser(userItem.uuid)"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { User } from "@/interface/user";
import { useUser } from "@/hook/user";

const user = useUser()

const form = reactive<User>({
  name: '',
  age: 0
})

const onClick = () => {
  user.addUser(form)
};

const removeUser = (uuid: User['uuid']) => {
  user.removeUser(uuid)
}
</script>

<style lang="sass" scoped src="./styles.sass"/>
