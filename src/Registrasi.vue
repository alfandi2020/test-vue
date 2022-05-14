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
                    Registrasi User
                </div>
                <div class="row">
                    <div class="col q-mr-lg">
                      <q-input filled v-model="nama" label="Nama" input-style="width:250px;" />
                    </div>
                    <div class="col">
                      <q-input filled v-model="user" label="Username" input-style="width:250px;" />
                    </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col q-mr-lg">
                    <q-input v-model="pass" label="password" input-style="width:250px;" filled :type="isPwd ? 'password' : 'text'"/>
                  </div>
                  <div class="col">
                    <q-input v-model="pass_conf" label="password konfirmasi" input-style="width:250px;" filled :type="isPwd ? 'password' : 'text'"/>
                  </div>
                </div>
                <div class="row q-mt-lg">
                   <div class="col-2">
                       <q-btn type="submit" unelevated rounded color="warning" label="Registrasi" />
                    </div>
                    <div class="col-6">
                        <router-link to="/">Apakah punya user ? Silahkan Login </router-link>
                    </div>
                   
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
import {api} from '@/basepath/axios'


export default {
  name: 'LayoutDefault',

  components: {
    // HelloWorld
  },

  setup () {
    const $q = useQuasar()
    const user = ref(null)
    const pass = ref(null)
    const pass_conf = ref(null)
    const nama = ref(null)
    const router = useRouter()
    return {
      nama,
      user,
      pass,
      pass_conf,
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
        }else if(pass.value != pass_conf.value){
          $q.notify({
                      color: 'red-5',
                      textColor: 'white',
                      icon: 'warning',
                      message: 'Password harus sama !'
          })
        }
        else {
          api.post('/registrasi',{
                nama  : nama.value,
                username  : user.value,
                password : pass.value,
                password_confirmation : pass_conf.value
            }).then(function (res){
                console.log(res.data);
            })
            router.push({path:'/home'})
             $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: "Login Berhasil"
            })
        }
      },

    }
  }
}
</script>
