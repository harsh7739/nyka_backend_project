
const { Router } = require("express");
const { ProductModel } = require("../model/product.model");

const productRouter = Router();


// For getting All Data


productRouter.get("/", async (req, res) => {
  const {name,gender,category,sort,order}=req.query
  try {
    if(order){

      if(order=="asc"){
        const products=await ProductModel.find(req.query).sort({price:1})
      if (products.length === 0 || !products) {
        res.status(200).json({ error: "no products found" });
      }else{
        res.status(200).send(products);
      }
      }else if(order=="desc"){
        const products=await ProductModel.find(req.query).sort({price:-1})
      if (products.length === 0 || !products) {
        res.status(200).json({ error: "no products found" });
      }else{
        res.status(200).send(products);
      }
      }
      
    }else if(req.query){
      const products=await ProductModel.find(req.query)
      if (products.length === 0 || !products) {
        res.status(200).json({ error: "no products found" });
      }else{
        res.status(200).send(products);
      }
    }
    else{

      const products = await ProductModel.find();
      if (products.length === 0 || !products) {
        res.status(200).json({ error: "no products found" });
      }else{
        res.status(200).send(products);
      }
    }
    // if (products.length === 0 || !products) {
    //   res.status(200).json({ error: "no products found" });
    // }else{
    //   res.status(200).send(products);
    // }
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message});
  }
});

//For posting Data 

productRouter.post("/", async (req, res) => {
  try {
    req.body.created_at = new Date();
    let product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ message: "product added successfully", product });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message});
  }
});


//For getting single Data


productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      res.status(200).json({ error: "no products found" });
    } else {
      res.status(200).send(product);
    }
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message});
  }
});

// For update the data
productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    req.body.updated_at=new Date()
    const product=await ProductModel.findOne({_id:id})
    if (!product) {
      res.status(204).json({ error: "no products found" });
    } else {
     await ProductModel.findByIdAndUpdate({_id:id},req.body);
      res.status(204).send({ "message": "product updated successfully" });
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: error.message});
  }
});

// For delete Data
productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let product= await ProductModel.findOne({_id:id})
    if (!product) {
      res.status(202).json({ error: "no products found" });
    } else {
      await ProductModel.findByIdAndDelete({_id:id});
      res
        .status(202)
        .send({ message: "product deleted successfully" });
    }
  } catch (error) {
    res
      .status(401)
      .send({ error: error.message});
  }
});

module.exports = {
  productRouter,
};
