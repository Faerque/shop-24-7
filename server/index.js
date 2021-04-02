const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const admin = require("firebase-admin");

const port = process.env.PORT || 5055;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

app.use(cors());
app.use(express.json());

const serviceAccount = require('./shop-24-7-firebase-adminsdk-2tgiw-58e18b2645.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.send("Welcome to shope-24 server!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cpqmt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  console.log("Connection Error", err);

  const productsCollection = client.db("Shop24").collection("products");

  app.get("/products", (req, res) => {
    productsCollection.find().toArray((err, items) => {
      res.send(items);
     
    });
  });

  app.post("/addProduct", (req, res) => {
    const newProduct = req.body;
    console.log("adding new product", newProduct);
    productsCollection.insertOne(newProduct).then((result) => {
      console.log("inserted Count", result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

  app.delete("/delete/:id", (req, res) => {
    const id = ObjectID(req.params.id);
    console.log("delete this", id);
    productsCollection
      .findOneAndDelete({ _id: id })
      .then((document) => res.send(document.deleteCount > 0));
  });
  

 

  console.log("Products Database Connected Successfully");

  app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    productsCollection.find({ _id: ObjectID(id) }).toArray((err, products) => {
      res.send(products[0]);
    });
  });

});

client.connect((err) => {
  console.log("Connection Error", err);

  const ordersCollection = client.db("Shop24").collection("orders");

  app.get("/orders", (req, res) => {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith("Bearer ")) {
      const idToken = bearer.split(' ')[1];
  
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          
          const tokenEmail = decodedToken.email;
          const queryEmail = req.query.email;
          
          if (tokenEmail == queryEmail) {
              ordersCollection.find({email: queryEmail})
            .toArray((err, documents)=>{
              res.status(200).send(documents);
            })
            // .catch((error) => {
            //   res.status(401).send('un-authorized access!!')  
            // })
          }
          else{
            res.status(401).send('un-authorized access!!')  
          }
          
        })
    }

  });
  app.post("/addOrder", (req, res) => {
    const newChecking = req.body;
    console.log(newChecking)
    ordersCollection.insertOne(newChecking).then((result) => {
      res.send(result.insertedCount > 0);
      console.log("inserted Count", result.insertedCount);
    });
  });

   console.log("Orders Database Connected Successfully");
});

app.listen(port, () => {
  console.log(`Port at http://localhost:${port}`);
});
