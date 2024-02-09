
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../model/user.model")

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  console.log(req.body)
  const { username,avatar, email, password } = req.body;
 
  try {
  
    const isEmailExists = await UserModel.findOne({ email });

    if (isEmailExists) {
      res.status(422).send({ error: "User already exists." });
    }else{
      bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
          res.status(201).send({"msg":"password can not hash please provide other password"})
        }else{
          const user=new UserModel({ username,avatar,email,password: hash,created_at: new Date() })

          await user.save()

          res.status(201).send(`New user with email ${email} is registered`);

        }
      })
    }
   
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
     return res.status(401).send({ error: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result)=> {
      // result == true
      if(result){
        const { _id: id, name } = user;
          const token= jwt.sign({ id, name},"masai")
          res.status(200).send({"msg":"Login Successfull",token: token, ID: id, NAME: name})
      }else{
          res.status(200).send({"msg":"Wrong Credential"})
      }
  });


  } catch (error) {
    res
      .status(401)
      .json({ error: error.message});
  }
});

module.exports = { userRouter };
