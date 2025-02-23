import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt"
import base64 from "base-64"
import dotenv from "dotenv"
import User from "./UserModel.js"
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())
const DB_User = process.env.DB_User
const DB_key = process.env.key

mongoose.connect(`mongodb+srv://${DB_User}:${DB_key}@cluster0.u7kjr.mongodb.net/momentum?retryWrites=true&w=majority&appName=Cluster0`).then(response => {
    console.log("Connected to the database");
})
    .catch(error => {
        console.log("Error connecting to the database");
    });

app.get("/graph", async (req, res) => {
    try {
        const graphData = await User.findOne({ username: "Ajay0832" });
        if(!graphData){
            return res.send(400,"You are Bad!")
        }
        console.log(graphData);
        return res.send(200,graphData)
    }
    catch (error) {
        console.log(error);
        res.send(500, "Server Issue Please Try Again !")

    }

});
app.post("/graph", (req, res) => {
    const { host, username, password, data } = req.body;
    try {
        // const userData = new User(
        //     { name: host, username, password, proxy: data }
        // )
        // userData.save().then(response => {
        //     console.log("saved to db");
        //     return res.send(200, "user successfully created!")
        // })
        //     .catch((error) => {
        //         console.log("failed to save user in DB", error);
        //         return res.send(500, 'failed to save user in DB!')
        //     })
    }
    catch (error) {
        console.log(error);
        res.send(400, "failed to save data")
    }

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});