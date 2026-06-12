<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      v-model="email"
      type="email"
      label="Email"
      lazy-rules
      :rules="[
        (val) => !!val || 'Email is required',
        (val) => /.+@.+/.test(val) || 'Invalid email',
      ]"
    />

    <q-input
      v-model="password"
      type="password"
      label="Password"
      lazy-rules
      :rules="[
        (val) => !!val || 'Password is required',
        (val) => val.length >= 8 || 'Min 8 characters',
      ]"
    />

    <q-btn label="Log In" type="submit" color="primary" :loading="loading" />
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const email = ref('')
const password = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true
  fetch('/api/user/SignIn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) throw new Error('Credenciales inválidas')
        throw new Error('Error al iniciar sesión')
      }
      return res.json()
    })
    .then(() => {
      $q.notify({
        color: 'positive',
        message: 'Inicio de sesión exitoso',
        position: 'top',
      })
    })
    .catch((error) => {
      $q.notify({
        color: 'negative',
        message: error.message,
        position: 'top',
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
