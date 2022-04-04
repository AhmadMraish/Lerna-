import Vuex from "vuex";
import Layout from "./modules/mainLayout";
import Notifications from "../../../notifications.agentsoncloud.com/store/modules/notifications";
import allConsumers from "../../../consumer-management/store/modules/allConsumers";
import blackListManegment from "../../../consumer-management/store/modules/blackListManegment";
import serviceProviders from "../../../consumer-management/store/modules/serviceProviders";
import services from "../../../consumer-management/store/modules/services";
import inventory from '../../../inventory.agentsoncloud.com/store/modules/inventory';
import createAppointment from '../../../clinic.management.agentsoncloud.com/store/modules/createappointment'
import updateAppointment from '../../../clinic.management.agentsoncloud.com/store/modules/updateappointment'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Layout,
      Notifications,
      allConsumers,
      services,
      serviceProviders,
      blackListManegment,
      inventory,
      createAppointment,
      updateAppointment

    },
  });
};

export default createStore;
