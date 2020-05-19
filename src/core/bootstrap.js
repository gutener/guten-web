import Vue from 'vue'
import store from '@/store/'
import {
  ACCESS_TOKEN,
} from '@/store/mutation-types'
export default function Initializer () {
  store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
}
