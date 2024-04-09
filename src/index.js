import express from "express";
import morgan from "morgan";
import ProductsRoutes from "./routes/products.routes.js";

const app = express()


app.use(morgan("dev"))
app.use(express.json())
app.use("/api", ProductsRoutes)

app.use((req,res) => {
    res.status(404).json({
        message: "HTTP 404 NOT FOUND"
    })
})

app.listen(3000)

console.log("Server on port 3000")