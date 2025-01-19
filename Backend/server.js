import express from 'express'
import dotenv from "dotenv"
import path from "path"
import {connectDB} from "./config/db.js"
import productRoutes from "./routes/product.route.js"
const app = express();

dotenv.config()
const PORT = process.env.PORT ||5000
const __dirname = path.resolve()
app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/products",productRoutes)
//everything in the route file will be prefixed with /api/products
//this really helps clean the server.js file and makes it more readable
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/mern-frontend/dist')));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'mern-frontend', 'dist', 'index.html')))
}
//most important RESTful API endpoints include GET, POST, PUT, DELETE
app.listen(5000, () =>{
    connectDB();
    console.log('server started at http://localhost:'+PORT)
})

