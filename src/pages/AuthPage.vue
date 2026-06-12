<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-brand">
        <q-icon name="storefront" size="48px" color="white" />
        <h4 class="text-white q-mt-sm q-mb-none">Shopping App</h4>
        <p class="text-white text-opacity-70 q-mt-xs">Tu tienda en línea favorita</p>
      </div>

      <q-card class="auth-card" bordered>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-2 tabs-custom"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Iniciar Sesión" icon="login" />
          <q-tab name="register" label="Crear Cuenta" icon="person_add" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <q-form @submit="handleLogin" class="q-gutter-md">
              <q-input
                v-model="loginForm.email"
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

              <q-input
                v-model="loginForm.password"
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                outlined
                dense
                lazy-rules
                :rules="[
                  val => !!val || 'La contraseña es requerida',
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

              <q-btn
                label="Iniciar Sesión"
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
                  label="¿No tienes cuenta? Regístrate"
                  color="primary"
                  no-caps
                  size="sm"
                  @click="tab = 'register'"
                />
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="register">
            <q-form @submit="handleRegister" class="q-gutter-md">
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-input
                    v-model="registerForm.firstName"
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
                    v-model="registerForm.lastName"
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
                v-model="registerForm.email"
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
                    v-model="registerForm.password"
                    label="Contraseña"
                    :type="showRegisterPassword ? 'text' : 'password'"
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
                        :name="showRegisterPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="showRegisterPassword = !showRegisterPassword"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-6">
                  <q-input
                    v-model="registerForm.confirmPassword"
                    label="Confirmar contraseña"
                    :type="showRegisterPassword ? 'text' : 'password'"
                    outlined
                    dense
                    lazy-rules
                    :rules="[
                      val => !!val || 'Requerida',
                      val => val === registerForm.password || 'Las contraseñas no coinciden',
                    ]"
                  >
                    <template #prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </div>
              </div>

              <q-input
                v-model="registerForm.dateOfBirth"
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
                    v-model="registerForm.country"
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
                    v-model="registerForm.type"
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
                v-model="registerForm.address"
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
                  @click="tab = 'login'"
                />
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { login, register } from '@/services/api'

const $q = useQuasar()
const router = useRouter()

const tab = ref('login')
const loading = ref(false)
const showPassword = ref(false)
const showRegisterPassword = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
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

async function handleLogin() {
  loading.value = true
  try {
    const data = await login(loginForm.email, loginForm.password)
    if (data.token) {
      localStorage.setItem('token', data.token)
    }
    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: 'Inicio de sesión exitoso',
    })
    router.push('/')
  } catch (err) {
    $q.notify({
      color: 'negative',
      icon: 'error',
      message: err.message || 'Error al iniciar sesión',
    })
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  loading.value = true
  try {
    const payload = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      password: registerForm.password,
      dateOfBirth: registerForm.dateOfBirth,
      country: registerForm.country,
      address: registerForm.address,
      type: registerForm.type.value || registerForm.type,
    }
    await register(payload)
    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: 'Cuenta creada exitosamente. Inicia sesión.',
    })
    tab.value = 'login'
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

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 460px;
}

.auth-brand {
  text-align: center;
  margin-bottom: 32px;
}

.auth-brand h4 {
  font-weight: 700;
  letter-spacing: -0.5px;
}

.text-opacity-70 {
  opacity: 0.7;
}

.auth-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.tabs-custom {
  border-radius: 16px 16px 0 0;
}

.q-tab-panel {
  padding: 24px;
}
</style>
