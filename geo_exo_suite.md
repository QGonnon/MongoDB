Soit un objet GeoJSON de la forme suivante :

```js
var polygone = {
  type: "Polygon",
  coordinates: [
    [
      [43.94899, 4.80908],
      [43.95292, 4.80929],
      [43.95174, 4.8056],
      [43.94899, 4.80908],
    ],
  ],
};
```

Donnez le nom des salles qui résident à l’intérieur.
```js
 db.salles.find({
  "adresse.localisation":{$geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [43.94899, 4.80908],
            [43.95292, 4.80929],
            [43.95174, 4.8056],
            [43.94899, 4.80908],
          ],
        ]
      }
  }}},{_id:0,"nom":1})
```