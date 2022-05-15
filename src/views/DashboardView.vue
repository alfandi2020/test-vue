<template>
<div style="background-image: url('https://i.ibb.co/df6PrbM/bg.jpg');
background-position: center; background-size: cover;position:absolute;width:100%">
  <q-layout view="lHh Lpr lFf" style="background:rgba(157, 141, 141, 0);">
    <q-page-container class="flex flex-center">
        <h4 style="color:#027BE3;">Selamat Datang, {{dataUser.nama}}</h4>
    </q-page-container>
  </q-layout>
</div>
</template>

<script>
import { useQuasar } from 'quasar'
import {api} from '@/basepath/axios'

export default {
    data() {
    const dataUser= ''
    const $q = useQuasar()

    return{
        dataUser,
        getUser(){
            let token = $q.localStorage.getItem('token')
            api.post('/profile',
            {
            get : ''
            },
            { headers: {"Authorization" : `Bearer ${token}`}}).then(res =>{
                    this.dataUser = res.data
                })
        }
    }
        
    },
    mounted(){
      this.getUser()
    }
}
</script>
