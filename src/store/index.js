import { defineStore } from 'pinia'

export const useStore = defineStore('store;', {
  state: () => {
    return {
      cartMovies: [
        // {id: 436270, poster_path:"/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"},
        // {id: 76600, poster_path:"/94xxm5701CzOdJdUEdIuwqZaowx.jpg"}
      ],
      // [436270, 76600],
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++;
    },
    log(){
        console.log(this.genres)
    }
  },
});