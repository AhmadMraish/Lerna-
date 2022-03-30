
import axios from "axios";
import Swal from "sweetalert2";


export const sortByDateKey = (notifications, key) =>
notifications.sort(
  (a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime()
);
export const sortByDateKeySenders = (sentNotifications, key) =>
sentNotifications.sort(
  (a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime()
);

const notifications = {
    namespace: true,
    state: {
        drawer: false,
        tasksDrawer:false,
        notifications: [],
        movedSettings:[],
        setNotifications: [],
        selectedNotification: [],
        showForm: false,
        dialog: false,
        sentNotifications: [],
        deletedNotifications: [],
        messages: 0,
        checked: [],
        settingsAlert: false
    },
  
  
    actions: {
        getMovedSettings(state) {
            return state.movedSettings
          },
          getSettingsAlert(state) {
            return state.settingsAlert
          },
          getCheckedNotifications(state) {
            return state.checked
          },
          getNumberOfNotification(state) {
            return state.messages
          },
          getAllDeletedNotifications(state) {
            return state.deletedNotifications
          },
          getDialog(state) {
            console.log("set dilog gets clled from getters", state.dialog);
        
            return state.dialog;
          },
          getAllNotifications(state) {
            return state.notifications;
          },
          getNotificationBySenderId(state) {
            return state.sentNotifications;
          },
          // getMorityId: (state) =>(id)=>{
          //   return state.products.find(product => product.id == id)
          // }
          getSelectedNotification(state) {
            return state.selectedNotification;
          },
          getFormFlag(state) {
            return state.formFlag;
          },
    },
    mutations: {
        getNotifications({ commit }) {
            //hit the api here
            
            axios.get("http://localhost:30192/notifications").then((notification) => {
              commit("setNotifications", notification.data);
            });
          },
          createNotification({ commit }, notificationObject) {
        
            axios
              .post("http://localhost:30192/create", notificationObject)
              .then((result) => {
                Swal.fire({
                  position: "centered",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                console.log("Rersult>>>>>>>>>>>>>>>>>>>>>", result.data);
              })
              .catch((err) => {
                Swal.fire({
                  position: "centered",
                  icon: "error",
                  title: "There is an error in Creating a new notification",
                  showConfirmButton: false,
        
                  timer: 3000,
                });
                console.log("err>>>>>>>>>>>>>>>>>>>>", err);
              });
          },
          getNotificationDetails({ commit }, notificationDetail) {
            console.log("ana", notificationDetail);
            commit("setSelectedNotification", notificationDetail);
          },
          getAllDeletedNotifications({ commit }) {
            console.log("getAllDeletedNotifications fired");
            // get the sender id from CAIM 
            axios.post("http://localhost:30192/deleted", { sender_id: 3 }).then((notifications) => {
              commit("SetDeletedNotifications", notifications.data);
            });
          },
          async deleteNotification({ commit }, id) {
            console.log("fired", id);
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              confirmButtonText: "Yes, delete it!",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                console.log("after confiremd", id);
                axios.put(`http://localhost:30192/delete/${id}`);
                commit("removeNotification", id);
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            });
          },
          getNotificationBySenderId({ commit }) {
            // get the user id from CAIM
            axios
              .get("http://localhost:30192senders/3")
              .then((notification) => {
                commit("setSentNotifications", notification.data);
                console.log("get notifcaiton by id ", notification.data);
              });
          },
          async setFlag({ commit }, id) {
            await axios.put(`http://localhost:30192/updateFlag/${id}`);
            commit("updateFlag", id);
          },
          setNotification({ commit }, notifications) {
            commit("setNotifications", notifications);
          },
          setSingleNotification({ commit }, notifications) {
            console.log("sat single notification");
        
            commit("mutateSingleNotification", notifications);
          },
          setFormFlag({ commit }) {
            commit("mutateFormFlag");
          },
          drawer({commit}, val) {
           commit("drawer", val);
          
          },
    },
    getters: {
        getMovedSettings(state) {
            return state.movedSettings
          },
          getSettingsAlert(state) {
            return state.settingsAlert
          },
          getCheckedNotifications(state) {
            return state.checked
          },
          getNumberOfNotification(state) {
            return state.messages
          },
          getAllDeletedNotifications(state) {
            return state.deletedNotifications
          },
          getDialog(state) {
            console.log("set dilog gets clled from getters", state.dialog);
        
            return state.dialog;
          },
          getAllNotifications(state) {
            return state.notifications;
          },
          getNotificationBySenderId(state) {
            return state.sentNotifications;
          },
          // getMorityId: (state) =>(id)=>{
          //   return state.products.find(product => product.id == id)
          // }
          getSelectedNotification(state) {
            return state.selectedNotification;
          },
          getFormFlag(state) {
            return state.formFlag;
          },
    },
  }
  
  export default notifications
  