import Vuex from "vuex";
import Layout from "./modules/mainLayout";
import Notifications from "../../../Notifcation/store/modules/notifications";
import allConsumers from "../../../consumer-management/store/modules/allConsumers";
import blackListManegment from "../../../consumer-management/store/modules/blackListManegment";
import serviceProviders from "../../../consumer-management/store/modules/serviceProviders";
import services from "../../../consumer-management/store/modules/services";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Layout,
      Notifications,
      allConsumers,
      services,
      serviceProviders,
      blackListManegment

    },
  });
};

export default createStore;
