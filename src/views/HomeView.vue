<template>
<div style="background-image: url('https://i.ibb.co/df6PrbM/bg.jpg');
background-position: center; background-size: cover;position:absolute;width:100%">
  <q-layout view="lHh Lpr lFf" style="background:rgba(157, 141, 141, 0);">
    <q-page-container>
    <div class="row q-mt-lg">
      <div class="col-12 col-md-2 q-ml-lg" v-if="mode == 'table'">
        <q-btn color="primary" @click="mode = 'form'" label="tambah produk" rounded />
      </div>
      <div class="col-12 col-md-2 q-ml-lg" v-else-if="mode == 'form'">
        <q-btn color="primary" @click="mode = 'table'" label="back" rounded />
      </div>
      <div class="col-12 col-md-3">
      <q-btn color="warning" @click="logout()" label="Logout" rounded />

      </div>
      <div class="col-12 col-md-4">
       <span v-if="mode == 'table'"> Tabel Data Produk</span>

      </div>
      <!-- <div class="col-12 col-md-2">
       Hallo {{dataUser.nama}}

      </div> -->
    </div>
    <div v-if="mode == 'form'" >
        <q-form
        @submit="addproduk"
        class="q-gutter-md"
        >
            <q-page class="flex-center">
            <div class="q-pa-md">
                <div class="text-h6 q-mb-lg">
                    
                  <p style="color: rgb(2, 100, 227)"> Form Produk</p>
                </div>
                <div class="row">
                    <div class="col q-mr-lg">
                      <q-input filled bg-color="white" v-model="nama" label="Nama"/>
                    </div>
                    <div class="col">
                      <q-input filled bg-color="white" v-model="kategori" label="Kategori"/>
                    </div>
                </div>
                <div class="row q-mt-lg">
                  <div class="col q-mr-lg">
                    <q-input filled type="number" v-model="qty" bg-color="white" label="qty"/>
                    
                  </div>
                  <div class="col">
                    <q-input filled v-model="harga" bg-color="white" label="harga" />
                  </div>
                </div>
                <div class="row q-mt-lg">
                   <div class="col-1">
                       <q-btn type="submit" unelevated rounded color="warning" label="Submit" />
                    </div>
                </div>
            </div>
            </q-page>
        </q-form>
    </div>
    <div v-else-if="mode == 'table'">
      <div class="q-pa-md">
            <q-table
              title="Data Produk"
              :rows="dataProduk.data"
              :columns="columns"
              :filter="filter"
              row-key="nama"
            >
             <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template>
                      <q-btn
                        color="primary"
                        icon-right="delete_forever"
                        no-caps
                        @click="deleteSelected"
                      />
                    </template>
                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-btn
                        color="primary"
                        icon="edit"
                        no-caps
                        flat
                        dense
                        @click="editProduk(props.row)"
                      />
                       
                      </q-td>
                      <q-dialog v-model="show_produk" persistent>
                        <q-card>
                          <q-form
                            @submit="updateproduk"
                            class="q-gutter-md"
                            >
                          <q-card-section class="items-center">
                            <div class="row">
                              <div class="col q-mr-lg">
                                <q-input v-model="editList.nama" label="Nama"></q-input>
                              </div>
                              <div class="col">
                                <q-input v-model="editList.kategori" label="Kategori"></q-input>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col q-mr-lg">
                                <q-input v-model="editList.qty" label="Qty"></q-input>
                              </div>
                              <div class="col">
                                <q-input v-model="editList.harga" label="Harga"></q-input>
                              </div>
                            </div>
                                <input type="hidden" v-model="editList.id" label="Nama"/>

                          </q-card-section>

                          <q-card-actions align="right">
                            <q-btn flat label="Cancel" color="primary" v-close-popup />
                            <q-btn flat label="Update" color="primary" type="submit" />
                          </q-card-actions>
                          </q-form>
                        </q-card>
                      </q-dialog>
                    </template>
            </q-table>
        </div>
    </div>
   
  </q-page-container>
</q-layout>
</div>
</template>

<script>
const columns = [
  {
    nama: 'nama',
    required: true,
    label: 'Nama',
    align: 'left',
    field: row => row.nama,
    format: val => `${val}`,
    sortable: true
  },
  {
    nama: 'nama',
    required: true,
    label: 'Kategori',
    align: 'left',
    field: row => row.kategori,
    format: val => `${val}`,
    sortable: true
  },
  {
    nama: 'nama',
    required: true,
    label: 'Qty',
    align: 'left',
    field: row => row.qty,
    format: val => `${val}`,
    sortable: true
  },
  {
    nama: 'nama',
    required: true,
    label: 'Harga',
    align: 'left',
    field: row => row.harga,
    format: val => `${val}`,
    sortable: true
  },
  {
    nama: 'namax',
    required: true,
    label: 'Total Harga',
    align: 'left',
    field: row => row.total_harga,
    format: val => `${val}`,
    sortable: true
  },
  {
    name:'action',
    label: 'Total Harga',
    align: 'left',
     field: 'namaa',
  },
]
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import {api} from '@/basepath/axios'
export default {
  name: 'HomeView',
  components: {
    // HelloWorld
    
  },

  data(){
    const $q = useQuasar()
    const dataProduk = []
    const dataUser= ''
    const dataEdit = ''
  

  
    return {
      columns,
      // rows,
      nama : '',
      kategori:'',
      qty:'',
      harga:'',
      editList : {
        nama : '',
        kategori : '',
        qty : '',
        harga : '',
      },
      dataProduk,
      dataUser,
      dataEdit,
      mode : 'table',
      show_produk : false,
      filter: ref(''),
      getProduk(){
        $q.loading.show()
        setTimeout(() => {
          $q.loading.hide()
        }, 1000)

        let token = this.$q.localStorage.getItem('token')
        api.post('/produk',
        {
          get : ''
        },
        { headers: {"Authorization" : `Bearer ${token}`}}).then(res =>{
                console.log(res.data);
                this.dataProduk = res.data
            })
        api.post('/profile',
        {
          get : ''
        },
        { headers: {"Authorization" : `Bearer ${token}`}}).then(res =>{
                console.log(res.data);
                this.dataUser = res.data
            })
      },
      
    }
    
  },
  methods:{
    editProduk(item) {
      this.editedIndex = this.dataEdit.indexOf(item);
      this.editList = Object.assign({}, item);
      console.log(item)
      this.show_produk = true;
    },
    updateproduk(){
      let token = this.$q.localStorage.getItem('token')
        api.post('/produk',
        {
          nama : this.editList.nama,
          kategori : this.editList.kategori,
          qty : this.editList.qty,
          harga : this.editList.harga,
          update : 'UpdateProduk',
          id : this.editList.id
        },
        { headers: {"Authorization" : `Bearer ${token}`}}).then(res =>{
                // this.mode = 'table'
                console.log(res.data)
                this.$q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: "Produk berhasil diupdate"
                })
                this.$q.loading.show()
                setTimeout(() => {
                  this.$q.loading.hide()
                }, 1000)
                setTimeout(() => {
                this.$router.go()
                }, 1400);
            })
    },
    addproduk(){
        let token = this.$q.localStorage.getItem('token')
        let total_harga = this.qty * this.harga
        api.post('/produk',
        {
          nama : this.nama,
          kategori : this.kategori,
          qty : this.qty,
          harga : this.harga,
          total_harga: total_harga
        },
        { headers: {"Authorization" : `Bearer ${token}`}}).then(res =>{
                // this.mode = 'table'
                console.log(res.data)
                this.$q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: "Produk berhasil ditambah"
                })
                this.$q.loading.show()
                setTimeout(() => {
                  this.$q.loading.hide()
                }, 1000)
                setTimeout(() => {
                this.$router.go()
                }, 1400);
            })
      },
  },
  mounted(){
    // this.addproduk()
        this.getProduk()
  }
}
</script>
