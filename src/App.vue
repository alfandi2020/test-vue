<template>
<div>
      <template v-if="$route.meta.fullscreen">
            <div class="row">
              <div class="col-md-12">
                <router-view></router-view>
              </div>
            </div>
      </template>
      <template v-else>
          <q-layout view="lHh Lpr lFf" style="height:700px" class="shadow-2 rounded-borders">
            <q-header reveal elevated>
              <q-toolbar>
                <q-btn flat round dense icon="menu" @click="drawerLeft = !drawerLeft" />

                <q-toolbar-title>
                  <strong>{{title}}</strong>
                </q-toolbar-title>

              </q-toolbar>
            </q-header>

            <q-drawer
              v-model="drawerLeft"
              :breakpoint="700"
              behavior="desktop"
              bordered
              class="bg-grey-3"
            >
              <q-scroll-area class="fit">
                <div class="q-pa-sm">
                  <q-list class="menu-list">

                  <q-item clickable :to="{path : '/home'}" @click="title = 'Dashboard'" :active="active" active-class="text-blue" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="dashboard" />
                    </q-item-section>

                    <q-item-section>
                      Dashboard
                    </q-item-section>
                  </q-item>

                  <q-item :to="{path : '/product'}" @click="title = 'Product'" :active="active" active-class="text-blue" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="inventory" />
                    </q-item-section>

                    <q-item-section>
                      Product
                    </q-item-section>
                  </q-item>
                  <q-item @click="logout()" :active="active" active-class="text-blue" clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="logout" />
                    </q-item-section>

                    <q-item-section>
                      Logout
                    </q-item-section>
                  </q-item>
                </q-list>
                </div>
              </q-scroll-area>
            </q-drawer>


            <q-page-container>
              <q-page>
                  <router-view/>
              </q-page>
            </q-page-container>
          </q-layout>
      </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
export default{
  name : 'App',
   components: {
  },
  data() {
    const title = ''
    const $q = useQuasar()
    console.log(title)

    return {
      title,
      drawerLeft: ref($q.screen.width > 700),
    }
    
  },
  methods : {
       logout(){
        this.$q.localStorage.remove('token')
        this.$router.push('/')
      }
  }
}
</script>
