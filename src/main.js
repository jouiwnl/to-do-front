import Vue from 'vue'
import App from './App.vue'
import './styles'
window.$ = window.jQuery = require('jquery');
import 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui-dist/jquery-ui';
require('jquery-ui-touch-punch');
import moment from 'moment';

Vue.config.productionTip = false;

export const eventBus = new Vue();

Vue.filter('formatDate', (valor) => {
  if (valor) {
    return moment(valor).format('DD/MM/YYYY HH:mm')
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
