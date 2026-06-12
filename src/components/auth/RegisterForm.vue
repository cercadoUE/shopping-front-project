<template>
  <q-form @submit="handleRegister" class="q-gutter-md">
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-input
          v-model="form.firstName"
          label="Nombre"
          outlined
          dense
          lazy-rules
          :rules="[val => !!val || 'Requerido']"
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
      <div class="col-6">
        <q-input
          v-model="form.lastName"
          label="Apellido"
          outlined
          dense
          lazy-rules
          :rules="[val => !!val || 'Requerido']"
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>
      </div>
    </div>

    <q-input
      v-model="form.email"
      label="Correo electrónico"
      type="email"
      outlined
      dense
      lazy-rules
      :rules="[
        val => !!val || 'El correo es requerido',
        val => /.+@.+\..+/.test(val) || 'Correo inválido',
      ]"
    >
      <template #prepend>
        <q-icon name="email" />
      </template>
    </q-input>

    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-input
          v-model="form.password"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          lazy-rules
          :rules="[
            val => !!val || 'Requerida',
            val => val.length >= 6 || 'Mínimo 6 caracteres',
          ]"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>
      <div class="col-6">
        <q-input
          v-model="form.confirmPassword"
          label="Confirmar contraseña"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          lazy-rules
          :rules="[
            val => !!val || 'Requerida',
            val => val === form.password || 'Las contraseñas no coinciden',
          ]"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
      </div>
    </div>

    <q-input
      v-model="form.dateOfBirth"
      label="Fecha de nacimiento"
      type="date"
      outlined
      dense
      lazy-rules
      :rules="[val => !!val || 'Requerida']"
    >
      <template #prepend>
        <q-icon name="calendar_today" />
      </template>
    </q-input>

    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <q-select
          v-model="form.country"
          label="País"
          :options="countries"
          outlined
          dense
          lazy-rules
          :rules="[val => !!val || 'Requerido']"
        >
          <template #prepend>
            <q-icon name="public" />
          </template>
        </q-select>
      </div>
      <div class="col-6">
        <q-select
          v-model="form.type"
          label="Tipo"
          :options="userTypes"
          outlined
          dense
          lazy-rules
          :rules="[val => !!val || 'Requerido']"
        >
          <template #prepend>
            <q-icon name="badge" />
          </template>
        </q-select>
      </div>
    </div>

    <q-input
      v-model="form.address"
      label="Dirección"
      type="textarea"
      outlined
      dense
      lazy-rules
      :rules="[val => !!val || 'Requerida']"
      rows="2"
    >
      <template #prepend>
        <q-icon name="home" />
      </template>
    </q-input>

    <q-btn
      label="Crear Cuenta"
      type="submit"
      color="primary"
      class="full-width"
      :loading="loading"
      :disable="loading"
      size="md"
      no-caps
    />

    <div class="text-center">
      <q-btn
        flat
        label="¿Ya tienes cuenta? Inicia sesión"
        color="primary"
        no-caps
        size="sm"
        @click="$emit('switch-to-login')"
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { register } from '@/services/api'

const emit = defineEmits(['register-success', 'switch-to-login'])

const $q = useQuasar()

const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
  country: '',
  address: '',
  type: '',
})

const countries = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia',
  'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'España',
  'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá',
  'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela',
]

const userTypes = [
  { label: 'Cliente', value: 'C' },
  { label: 'Administrador', value: 'A' },
]

async function handleRegister() {
  loading.value = true
  try {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      dateOfBirth: form.dateOfBirth,
      country: form.country,
      address: form.address,
      type: form.type.value || form.type,
    }
    await register(payload)
    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: 'Cuenta creada exitosamente. Inicia sesión.',
    })
    emit('register-success')
  } catch (err) {
    $q.notify({
      color: 'negative',
      icon: 'error',
      message: err.message || 'Error al registrarse',
    })
  } finally {
    loading.value = false
  }
}
</script>
