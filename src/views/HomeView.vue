<template>
  <div class="home">
    Tabel Data Produk
     <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div> 
  </div>
</template>

<script>
// import { ref } from 'vue'
import { useQuasar } from 'quasar'
// import { useRouter} from 'vue-router'
import {api} from '@/basepath/axios'
export default {
  name: 'HomeViewee',
  components: {
    // HelloWorld
    
  },

  setup(){
    const $q = useQuasar()
    // const user = ref(null)
    // const pass = ref(null)
    // const router = useRouter()
    return {
      // columns,
      // rows

      getProduk(){
        let token = $q.localStorage.getItem('token')
        api.get('/produk',{ headers: {"Authorization" : `Bearer ${token}`}}).then(function (res){
                console.log(res.data);

                // $q.notify({
                //     color: 'green-4',
                //     textColor: 'white',
                //     icon: 'cloud_done',
                //     message: "Login Berhasil"
                // })
            })
      },
    }
    
  }
}
</script>
