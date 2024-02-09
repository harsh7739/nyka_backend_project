const express = require("express")
const { userRouter } = require("./routes/user.router")
const { productRouter } = require("./routes/product.route")
const cors = require("cors")

const app = express()
app.use(cors())

app.use("/api/",userRouter)
app.use("/api/post",productRouter)



app.listen(8080,()=>{
    console.log("Server is runnig")
})

module.exports = app