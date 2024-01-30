# ATLAS

## INSTALLATIONS

- MongoDB ATLAS
- Permet de gérer des clusters
- Se charge de maintenir de déployer la BDD
- Utilise le fournisseur cloud de votre choix

# MongoDB

## DEFINITION

Index = accélère/optimiser les opérations de lecture
SGBD = système de gestion de base de données

## INTRODUCTION

Le mongoDB suit le format JSON et il est cross-plateform.
On stocke les données dans des collections (tables) contenant des documents (données).  
Lors de la création de collections, il n'y a pas de schéma précis.  
Un document est un ensemble de clé-valeur dynamique. Il est possible d'imbriquer des données en créant une valeur de type tableau.

## RDBMS (SGBDR) -> MongoDB

base de données -> base de données  
Table -> collection  
Tuple/Ligne/Row -> Document  
Colonne / Column -> Field  
Jointure -> Documents imbriqués  
Clé primaire -> Clé primaire*  
Mysqld -> mongod  
mysql -> mongo  

## AVANTAGES

Pas de schéma  
Une structure claire et simple : objet  
Pas de jointure complexe  
Des requetes imbriqués et dynamiques  

# TYPE DE DONNEES

- booleen
- numeriques
- chaine de caracteres
- tableau
- objet
- null (absence de valeur)

# Creation de base de donnees

On peut utiliser use pour se connecter a une bdd qui
n'existe pas. L'insertion du premier document va entrainer la
creation de la bdd

```
use tmp
db.uneCollection. insert({"key":"value"})
```

Vous pouvez effectuer la requete :

```
db.uneCollection.find()

db.uneCollection.find().pretty()
```

Vous obtenez un resultat du type :

```
{
"_id":0bjectId("5d12edfd09ffef"),
"key": "value"
}
```

Vous remarquez l'utilisation du mot cle db  
il s'agit d'un mot cle qui renvoie vers la base de donnees en cours d'utilisation.  
La combinaison db.uneCollection constitue ce qu'on appelle un namespace en mongoDb  

Suppression d'une base de donnees :

```
use maDb
db.dropDatabase()
```

Pour verifier utilisez la commande :

```
show dbs
```

afin de lister les base de donnees, MongoDB met a disposition des commandes de type 'helper'

runCommand()
adminCommand()

Pour creer une collection il suffit d'entrer:

```
db.createCollection(
    "maCollection",
    "collation": {
        "locale": "fr",
        "caseLevel": false,
        "strength": 3,
        "numericOrdering": false,
        "alternate": "non-ignorable",
        "backwards": false,
        "normalization": false
    }
)
```

Pour plus d'informations sur les collations :
<https://docs.mongodb.com/manual/reference/collation/>
<https://www.mongodb.com/docs/v6.2/reference/collation/>

### Chercher de l'information avec MongoDB

Voici la signature de la methode findOne:

```
db.collection.findOne(
<filtre>,
    {
        <projection>
    }
)
```

## UTILISATION DE AGGREGATE

### Premiere etape du pipeline : $match

```js
var pipeline = [
    {
        $match: {
            "interets": "jardinage"
        }
    }
]
db.personnes.aggregate(pipeline).pretty()
```

### Deuxieme etape du pipeline : $project

```js
var pipeline = [
    {
        $match: {
            "interets": "jardinage"
        }
    },
    {
        $project: {
            "_id": 0,
            "nom": 1,
            "prenom":1,
            "eligible": {$gte:["$age",70]}
        }

    },
    {
        $match: {
            "eligible": true
        }
    }
]
db.personnes.aggregate(pipeline).pretty()
```

# DOCKER

## Utilisation

lien des images : <https://hub.docker.com>
commande:

```bash
docker pull mongo #récupère l'image mongo
docker run -d -p 27017:27017 --name mongo mongo #lance un container mongo 
docker exec -it mongo /bin/bash #se connecte au container mongo
mongosh #lance le shell mongo
```

Ma solution :

```bash
docker run -d -p 27017:27017 --name mongo -v C:\Users\69140\OneDrive\Desktop\Isitech\MongoDB\data:/home/data mongo #lance un container mongo avec un volume
mongoimport --db=sample_db --collection="Motor Vehicle Collisions" --type=csv --headerline --file="Motor_Vehicle_Collisions_-_Crashes_20240130.csv"
```

Correction

```bash
docker cp Motor_Vehicle_Collisions_-_Crashes_20240130.csv mongo:/data/Motor_Vehicle_Collisions_-_Crashes_20240130.csv

mongoimport --db sample_db --collection Motor_Vehicle_Collisions --type csv --headerline --file data/Motor_Vehicle_Collisions_-_Crashes_20240130.csv
```

Expliquation des options :

- --type: precise le type de fichier, par defaut json
- -d: nom de la base de données
- -c/ --collection: nom de la collection
- --headerline: indique que la premiere ligne du fichier est le header
- --drop: supprime la collection avant d'importer les données

En cas d'authentification, il faut ajouter les options suivantes :

- --u/ --username: nom d'utilisateur
- --p/ --password: mot de passe
- --authenticationDatabase: nom de la base de données d'authentification

### Exo

récupérez la liste des restaurants ayant un grade inférieur à un score de 10 (Afficher cette liste sous forme de projection {name, grades.scores})

```
db.restaurants.find({
  $expr: {
    $lt: [
      {
        "$avg": "$grades.score"
      },
      10
    ]
  }
},
{
  _id:0,
  name:1,
  "grades.score":1
})
```

# Les requete géospatiales

## Pre-requis : les indexes

Un index est une structure de donnees qui stockent une petitite partie des donees de la collection. Cela permet d'accelerer les requetes. Les indexes ameliorent aussi les performances des requetes de tri et de regroupement.

Pour creer un index :

```js
db.<collection>.createIndex({'<champ>' : "<type d index>"})
```

Pour lister les indexes d'une collection:

```js
db.<collection>.getIndexes()
```

Pour supprimer un index :

```js
db.<collection>.dropIndex({'<champ>' : "<type d index>"})
```

## Les requetes geospatiales

### Le standard GeoJSON

GEOJson est un format open-source pour representer des donnees geographiques. Il est base sur le format JSON. Il permet de représenter des points, des lignes, des polygones, des multipoints, des multilignes, des multipolygones et des géométries géométriques.

Plus d'information sur le site officiel : <https://geojso.org/>

### Les indexes geospatiaux

MongoDB vous propose des indexes geospatiaux pour améliorer les performances des requetes geospatiales. il existe deux types d'index geospatiaux : les index 2d et les index 2dsphere.

```js
db.plan.createIndex({"geodata":"2d"}) #index 2d
```

#### Les indexes 2d

Ils utilisent des couples de coordonnées appelés `legacy`

Exemple d'insertion de données :

```js
db.plan.insert ({"nom": "Point 1", "geodata": [1,1]})
```

On peut aussi stocker des coordonnees avec des index2d:

```js
db.plan.insert({"nom": "Point 1", "geodata": [4.805528, 43.949317]}) // lon en premier puis lat
//ou
db.plan.insert ({
    nom: "Point 2",
    geodata: { lon: 4.805528, lat: 43.949317 },
});
```

#### Les index 2dsphere

Comme nous l'avons déjà dit, l'index 2dsphere est préconisé dès lors que des requêtes géospatiales utilisent la géométrie sphérique. Ce type d'index géospatial prend en charge deux sortes de coordonnées :

- les coordonnées legacy dont nous avons parlé plus haut

- les objets GeoJSON

Lorsque des coordonnees legacy sont utilisees, MongoDB les convertit en objet GeoJSON de type Point donc, quoiqu'il arrive, ce sont ces objets qui sont utilisés en coulisses !

### Les objets GeoJSON

Voici la structure d'un objet GeoJSON :

```js
{
    "type": "Point",
    "coordinates": [125.6, 10.1]    
}
```

el la structure generique : ```{ "type": "<type>", "coordinates": <coordinates> }```

### Les requetes geospatiales

```
db.avignon.insertMany([{
     "nom": "Palais des Papes",
     "localisation": {
         "coordinates": [43.9507, 4.8075],
         "type": "Point"
     }
  },
  {
     "nom": "Pont Saint-Bénézet",
     "localisation": {
     "coordinates": [43.95397, 4.80478],
     "type": "Point"
  }  },
    { 
    "nom": "Collection Lambert", 
    "localisation": { 
     "coordinates": [43.944787, 4.804031],
     "type": "Point" 
    }  
}]) 
```
Commencez par créer un index 2dsphere
sur la collection avignon :

```js
db.avignon.createIndex({"localisation":"2dsphere"})
```

#### L'operateur $nearSphere

La syntaxe generique est la suivante:

```js
{
    $nearSphere: {
        $geometry: {
            type : "Point",
            coordinates : [ <longitude>, <latitude> ]
        },
        $minDistance: <distance en mètres>,
        $maxDistance: <distance en mètres>
    }
}
```

#### L'operateur $geoWithin

La syntaxe generique est la suivante:

```js
{
    <champ des documents contenant les coordonnées>:{
        $geoWithin: {
            $geometry:{
                type: <"Polygon" ou bien "MultiPolygon">,
                coordinates: [<coordonnées>]
            }
        }
    }

}
```

#### L'operateur $geoIntersects

La syntaxe generique est la suivante:

```js
{
    <champ des documents contenant les coordonnées>:{
        $geoIntersects: {
            $geometry:{
                type: <tout type d'objet GeoJSON>,
                coordinates: [<coordonnées>]
            }
        }
    }

}
```