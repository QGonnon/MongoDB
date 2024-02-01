//Geo Point représente la localisation des tornades
//Geo Shape représente le trajet des tornades
db.historicalTornadoTracks.createIndex({"Geo Point":"2d"})