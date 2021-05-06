import gju from "geojson-utils"

import {gameArea, players} from ""


const gameAreaForResponse = gameArea.coordinates[0].map((p) => {
  return {latitude: p[0], longitude:p[1]}
})

export const resolvers = {

  Query: {
    gameArea: () =>{
      return {coordinates: [...gameAreaForResponse]};
    },
    isUserInArea: (_:any,{longitude,latitude}:{latitude:number,longitude:number})=> {
      const point = {type:"Point",coordinates:[longitude,latitude]}
      const isInside = gju.pointInPolygon(point,gameArea)
      let result: any = {};
      result.status = isInside;
      result.msg = isInside ? "Point was inside the GameArea" : "Point was NOT inside the GameArea";
      return result
    }






  },


};