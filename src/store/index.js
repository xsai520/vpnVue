/**
 * Created by Administrator on 2018/8/20 0020.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
//可以通过store.state来获取状态对象
//通过store.commit 方法触发状态变更 store.commit('increment') console.log(store.state.count) -> 1
const  store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    increment(state){
      state.count++
    }
  }
});
export default store
