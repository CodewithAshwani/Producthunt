const express =require("express");
const ProductService = require("./ProductService");
const app=express();
const port=8000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("this works ok");
});
app.get("/products", async (req, res) => {
  let products = await ProductService.getProducts();
  res.json(products);
});


app.get("/products/:id", async (req, res) => {
    let id=req.params.id;
    let allProducts = await ProductService.getProductById(id);
    res.json(allProducts);
  });


  app.get("/product/:name", async (req, res) => {
    let name=req.params.name;
    let allProducts = await ProductService.getProductByName(name);
    res.json(allProducts);
  });

app.post("/product",async (req,res)=>{
    let product=req.body;
    // console.log(product);
  let result=await ProductService.addProduct(product);
    // console.log(result);
    res.status(201).send(result);
  });

app.delete("/product/:name", async (req, res) => {
    let name= req.params.name;
    let result= await ProductService.deleteProductByName(name);
    // console.log(JSON.stringify(result));
    res.status(404).send(result);
  });
  

app.listen(port, () => {
    console.log(`Product app listening on port ${port}`);
  });
  