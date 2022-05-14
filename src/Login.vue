<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
        <q-form
        @submit="Login"
        class="q-gutter-md"
        >
            <q-page class="flex flex-center">
            <div class="q-pa-md">
                <div class="text-h6 q-mb-lg">
                    Login User
                </div>
                <div class="row">
                    <q-input filled v-model="user" label="Username" />
                </div>
                <div class="row q-mt-lg">
                    <q-input v-model="pass" label="password" filled :type="isPwd ? 'password' : 'text'"/>
                </div>
                <div class="row q-mt-lg">
                    <q-btn type="submit" unelevated rounded color="primary" label="Login" />
                </div>
            </div>
            </q-page>
        </q-form>
    </q-page-container>
  </q-layout>
</template>

<script>


import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter} from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'LayoutDefault',

  components: {
    // HelloWorld
  },

  setup () {
    const $q = useQuasar()
    const user = ref(null)
    const pass = ref(null)
    const router = useRouter()
    return {

      user,
      pass,
      isPwd: ref(true),
      Login () {
        if (!user.value) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'User tidak boleh kosong'
          })
        }else if (!pass.value) {
            $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Password tidak boleh kosong'
          })
        }else {
        router.push({path:'/about'})
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: user.value
          })
        }
      },

    }
  }
}
</script>
