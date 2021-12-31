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

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
