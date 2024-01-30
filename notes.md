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
https://docs.mongodb.com/manual/reference/collation/
https://www.mongodb.com/docs/v6.2/reference/collation/

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
lien des images : https://hub.docker.com 
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