<template>
<div style="background-image: url('https://i.ibb.co/df6PrbM/bg.jpg');
background-position: center; background-size: cover;position:absolute;width:100%">
  <q-layout view="lHh Lpr lFf" style="background:rgba(157, 141, 141, 0)">
    <q-page-container>
        <q-form
        @submit="Login"
        class="q-gutter-md"
        >
            <q-page class="flex flex-center">
            <div class="q-pa-md">
                <div class="text-h6 q-mb-lg">
                    <p style="color:#027be3;">Login User</p>
                </div>
                <div class="row">
                    <q-input filled v-model="user" bg-color="white" label="Username" input-style="width:250px;" />
                </div>
                <div class="row q-mt-lg">
                    <q-input v-model="pass" bg-color="white" label="password" input-style="width:250px;" filled :type="isPwd ? 'password' : 'text'"/>
                </div>
                <div class="row q-mt-lg">
                    <div class="col">
                        <q-btn type="submit" unelevated rounded color="primary" label="Login" />
                    </div>
                    <div class="col">
                       <router-link to="/registrasi"><q-btn unelevated rounded color="warning" label="Registrasi" /></router-link>
                    </div>
                </div>
            </div>
            </q-page>
        </q-form>
    </q-page-container>
  </q-layout>
  </div>
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
    const router = useRouter()
    return {

      user,
      pass,
      isPwd: ref(true),
      Login () {
        if (!user.value) {
        router.push({path:'/'})

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
           api.post('/login',{
                username  : user.value,
                password : pass.value
            }).then(function (res){
                // console.log(res.data);
                $q.localStorage.set('token',res.data.access_token)
                router.push({path:'/home'})
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: "Login Berhasil"
                })
            }).catch(function (error) {
                if (error.response.data.user == "Not Found") {
                    $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: "User tidak terdaftar",
                })
                }
              })
           
        }
      },

    }
  },
  mounted(){
    if (localStorage.getItem("token") == null) {
      this.$q.notify({
                    color: 'warning',
                    textColor: 'white',
                    icon: 'warning',
                    message: "Silahkan Login",
      })
    }
  }
}
</script>
