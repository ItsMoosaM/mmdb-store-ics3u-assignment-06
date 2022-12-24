import { defineStore } from 'pinia'

export const useStore = defineStore('store;', {
  state: () => {
    return {
      cartMovies: [
        // {id: 436270, poster_path:"/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg"},
        // {id: 76600, poster_path:"/94xxm5701CzOdJdUEdIuwqZaowx.jpg"}
      ],
      myChoice: [
        {id: 9502, poster_path:"/xCn3VOST64XpOA8x0gaQkQiZtZY.jpg"},
        {id: 49444, poster_path:"/mtqqD00vB4PGRt20gWtGqFhrkd0.jpg"},
        {id: 324857, poster_path:"/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"},
        {id: 272, poster_path:"/8RW2runSEc34IwKN2D1aPcJd2UL.jpg"},
        {id: 155, poster_path:"/qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
        {id: 49026, poster_path:"/hrJUZ5Jo2G3Czy391evhlxgbEdJ.jpg"},
        {id: 278, poster_path:"/hBcY0fE9pfXzvVaY4GKarweriG2.jpg"},
        {id: 414906, poster_path:"/74xTEgt7R36Fpooo50r9T25onhq.jpg"},
        {id: 10528, poster_path:"/momkKuWburNTqKBF6ez7rvhYVhE.jpg"},
        {id: 58574, poster_path:"/y1MYZkwhZK6L0Jy4YMuPktzDOfn.jpg"},
        {id: 157336, poster_path:"/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"},
        {id: 550, poster_path:"/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"},
        {id: 44896, poster_path:"/h9GJiKuuJ650dte0gyzLD3ILcIh.jpg"},
        {id: 920, poster_path:"/u4G8EkiIBZYx0wEg2xDlXZigTOZ.jpg"},
        {id: 49013, poster_path:"/okIz1HyxeVOMzYwwHUjH2pHi74I.jpg"},
        {id: 615457, poster_path:"/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg"},
        {id: 324849, poster_path:"/snGwr2gag4Fcgx2OGmH9otl6ofW.jpg"},
        {id: 274862, poster_path:"/vUo0pNXGhp2ffTJxiStWt6fHL7F.jpg"},
        {id: 137106, poster_path:"/9klB7qKC9aCeGyyM4uU5hSA6xDV.jpg"},
        {id: 330459, poster_path:"/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg"},
        {id: 329, poster_path:"/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg"},
        {id: 438631, poster_path:"/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"},
        {id: 98, poster_path:"/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"},
        {id: 1883, poster_path:"/zXn95Y4iZcab4A6bdXgXYxT8eOo.jpg"},
        {id: 1726, poster_path:"/78lPtwv72eTNqFW9COBYI0dWDJa.jpg"},
        {id: 299534, poster_path:"/or06FN3Dka5tukK1e9sl16pB3iy.jpg"},
        {id: 1495, poster_path:"/uk55nBEFIQFveIiy9jvLGiVtk4h.jpg"},
        {id: 475557, poster_path:"/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"},
        {id: 557, poster_path:"/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg"},
        {id: 245891, poster_path:"/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"},
      ],      
      //Stores Data on Load
      IsDataLoaded: false,
      Action: null,
      Adventure: null,
      Animation: null,
      Comedy: null,
      Crime: null,
      Documentary:null ,
      Drama: null,
      Family: null,
      Fantasy: null,
      History: null,
      Horror: null,
      Music: null,
      Mystery: null,
      Romance: null,
      SciFi: null,
      TVMovie: null,
      Thriller: null,
      War: null,
      Western: null,
    }
  },
  actions: {
    log() {
      console.log(this.genres)
    }
  },
});

