<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app">
        <OurDoctors ></OurDoctors>
        <app-drawer class="app--drawer"></app-drawer>
        <TasksDrawer class="app--drawer"></TasksDrawer>
                <app-toolbar class="app--toolbar"></app-toolbar>
          <page-header v-if="routeName !='INDEX' "></page-header>
          <!-- style="padding: 60px 28px 34px 304px;   margin-bottom: 120px;
" -->
        <v-main style ="padding: 0px 0px 0px;">
              <!-- Provides the application the proper gutter -->
   <!-- Page Header -->
          <div class="page-wrapper">
            <nuxt />
          </div>
          <!-- App Footer -->
         
          <TheLayoutToTopFab></TheLayoutToTopFab>


       
        </v-main>
                    <Footer></Footer>
        <!-- Go to top -->
        <!-- theme setting -->


      </v-app>
    </template>
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import OurDoctors from '../components/NavBar/OurDoctors.vue'
import TheLayoutToTopFab from "../components/TheLayoutToTopFab.vue";
import AppDrawer from "../components/AppDrawer.vue";
import TasksDrawer from "../components/TasksDrawer";
import AppToolbar from "../components/AppToolbar";
import AppFab from "../components/AppFab";
import PageHeader from "../components/PageHeader";
import { mapActions } from "vuex";
import ThemeSettings from "../components/ThemeSettings";
const { io } = require("socket.io-client");
export default {
  components: {
    OurDoctors,
    TheLayoutToTopFab,
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
    ThemeSettings,
    TasksDrawer,
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: "",
      color: "",
    },
  }),
  methods: {
    ...mapActions(["setSingleNotification"]),
    openThemeSettings() {
      this.$vuetify.goTo(0);
      this.rightDrawer = !this.rightDrawer;
    },
  },
  mounted() {
    console.log("Socket On");
    const socket = io.connect("http://localhost:30192/", {
      cors: {
        origin: "*",
      },
      transports: ["websocket"],
    });
    // // socket.on('connection', (connection) => {
    // //   console.log('connected', connection);
    // // })
    // // socket.emit("createNotification", "pushed message");
    // // socket.on("createNotification", (AllNotifications) => {
    // //   console.log('createNotification socket', AllNotifications);
    // //   this.setNotification(AllNotifications);
    // // });
    console.log("Socket ON");
    // //UserName here
    socket.emit("userConnected", { username: "Agents On Cloud" });
    socket.on("addNotification", (notification) => {
      this.$store.commit("setNotificationCounter");
      this.setSingleNotification(notification);
    });
  },
  computed: {
         routeName(){
        let upper = $nuxt.$route.name.toUpperCase()
          return  upper
    }
  }
};
</script>

<style lang="scss"  >
.container {
  border: none;
}
.setting-fab {
  top: 50% !important;
  right: 0;
  border-radius: 0;
}
.page-wrapper .container {
  height: 100% !important;
  margin-bottom: 50px;
  border: none;
  padding: 150px;
}
//Todo spaces for the wrapper 
.page-wrapper .container {
    height: 100% !important;
    margin-bottom: 50px;
    border: none;
    padding: 0px;
}

html {
  overflow-y: auto;
}
html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
