const express=require("express")
const app=express();
const PORT=8082;
const connectDb=require("./config/connectDb")
const indexRoute=require("./routes/index.route")
const cors=require("cors")

connectDb();
app.use(cors());
app.use(express.json())
app.use("/api",indexRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})