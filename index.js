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
        const graphData = await User.findOne({ username: "Qajay0832" });
        if (!graphData) {
            return res.send(400, "You are Bad!")
        }
        console.log(graphData);
        return res.send(200, graphData)
    }
    catch (error) {
        console.log(error);
        res.send(500, "Server Issue Please Try Again !")

    }

});
app.post("/graph", async (req, res) => {
    const { host, username, password,  dependencyIds } = req.body;
    let dbConfi = {
        flow: "flow name",
        entities_to_mock: dependencyIds,
        is_db_mocked: false,
        db_config: {
            username: username,
            password: password
        }
    }
    try {
        const graphData = await User.findOne({ username: username });
        if (!graphData) {
            res.send(404, "User not found")
        }
        try {
            const UpdateDependency = await User.findOneAndUpdate({ username: username },
                {
                    $set: {
                        dbSchema: dbConfi
                    }
                },
                { new: true }
            )
            if (!UpdateDependency) {
                res.send(400, "Bad Request Unable to find User!")
            }
            res.send(200, graphData)
        }
        catch (error) {
            console.log(error);
            res.send(500, "Error While Updating User")

        }
    }
    catch (error) {
        console.log(error);
        res.send(500, "Failed to Edit data Server Issue !")
    }

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});