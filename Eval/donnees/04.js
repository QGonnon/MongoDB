db.persons.insertMany([
  {
    firstname: "Elise",
    lastname: "Smith",
    vocation: "ENGINEER",
    language: "English",
  },
  {
    firstname: "Olive",
    lastname: "Ranieri",
    vocation: "ENGINEER",
    language: ["Italian", "English"],
  },
  {
    firstname: "Toni",
    lastname: "Jones",
    vocation: "POLITICIAN",
    language: ["English", "Welsh"],
  },
  {
    firstname: "Bert",
    lastname: "Gooding",
    vocation: "FLORIST",
    language: "English",
  },
  {
    firstname: "Sophie",
    lastname: "Celements",
    vocation: "ENGINEER",
    language: ["Gaelic", "English"],
  },
  {
    firstname: "Carl",
    lastname: "Simmons",
    vocation: "ENGINEER",
    language: "English",
  },
  {
    firstname: "Diego",
    lastname: "Lopez",
    vocation: "CHEF",
    language: "Spanish",
  },
  {
    firstname: "Helmut",
    lastname: "Schneider",
    vocation: "NURSE",
    language: "German",
  },
  {
    firstname: "Valerie",
    lastname: "Dubois",
    vocation: "SCIENTIST",
    language: "French",
  },
]);
//distinct tri automatiquement par ordre alphabétique, inutile donc d'utiliser un sort.
db.persons.distinct("language")