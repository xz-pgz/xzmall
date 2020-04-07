import {debounce} from "common/utils.js"
export const myMixin = {
  data() {
    return {
      listenerRefresh:null
    }
  },
  methods:{
    loadImg() {
      const refresh = debounce(this.$refs.bscroll.refresh,1000)
      this.listenerRefresh = () => {
        refresh()
      }
      this.$bus.$on('loadImg',this.listenerRefresh)
    },
  }
}