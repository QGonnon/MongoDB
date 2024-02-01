//1
//remplacer longitude et latitude par des coordonnées terrestres et radius en radian
//longitude et latitude sont inversé pour Geo Point, ce qui créer une erreur "out of bounds"
db.historicalTornadoTracks.find({
    "Geo Point":{$geoWithin:{
        $centerSphere: [[longitude, latitude], radius]
    }}
})

//2
db.historicalTornadoTracks.aggregate([
    {$group:{
        _id:"$state",
        nbTornado:{$sum:1},
    }}
])