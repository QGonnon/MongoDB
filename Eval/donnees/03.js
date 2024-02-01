db.orders.insertMany([
  {
    order_id: 6363763262239,
    products: [
      {
        prod_id: "abc12345",
        name: "Asus Laptop",
        price: NumberDecimal("431.43"),
      },
      {
        prod_id: "def45678",
        name: "Karcher Hose Set",
        price: NumberDecimal("22.13"),
      },
    ],
  },
  {
    order_id: 1197372932325,
    products: [
      {
        prod_id: "abc12345",
        name: "Asus Laptop",
        price: NumberDecimal("429.99"),
      },
    ],
  },
  {
    order_id: 9812343774839,
    products: [
      {
        prod_id: "pqr88223",
        name: "Morphy Richards Food Mixer",
        price: NumberDecimal("431.43"),
      },
      {
        prod_id: "def45678",
        name: "Karcher Hose Set",
        price: NumberDecimal("21.78"),
      },
    ],
  },
  {
    order_id: 4433997244387,
    products: [
      {
        prod_id: "def45678",
        name: "Karcher Hose Set",
        price: NumberDecimal("23.43"),
      },
      {
        prod_id: "jkl77336",
        name: "Picky Pencil Sharpener",
        price: NumberDecimal("0.67"),
      },
      {
        prod_id: "xyz11228",
        name: "Russell Hobbs Chrome Kettle",
        price: NumberDecimal("15.76"),
      },
    ],
  },
]);
db.orders.aggregate([
  {$unwind:"$products"},
  {$group:{
    _id:{$gt:["$products.price",15]},
    nbExpensiveProducts:{$sum:1},
    totalValueExpensiveProducts:{$sum:"$products.price"}
  }},
  {$match:{ _id:true }},
  {$project:{
    _id:0
  }}
])