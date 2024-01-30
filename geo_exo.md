# Exercices sur les index géographiques

## Exercice 1

Vous disposez du code JavaScript suivant qui comporte une fonction de conversion d’une distance exprimée en kilomètres vers des radians ainsi que d’un document dont les coordonnées serviront de centre à notre sphère de recherche. Écrivez la requête qui affichera le nom des salles situées dans un rayon de 60 kilomètres et qui programment du Blues et de la Soul.

```js
var KilometresEnRadians = function(kilometres){ var rayonTerrestreEnKm = 6371;
return kilometres / rayonTerrestreEnKm;
};
var salle = db.salles.findOne({"adresse.ville": "Nîmes"}); var requete = { ... };
db.salles.find();
```

## Exercice 2

Écrivez la requête qui permet d’obtenir la ville des salles situées dans un rayon de 100 kilomètres autour de Marseille, triées de la plus proche à la plus lointaine :

```js
var marseille = {"type": "Point", "coordinates": [43.300000, 5.400000]}
db.salles.find({
    "adresse.localisation":{
        $nearSphere: {
            $geometry: marseille,
            $maxDistance: 100000
        }
    }
},
{_id:0,"adresse.ville":1}
)
```
