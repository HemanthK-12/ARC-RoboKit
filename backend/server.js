import express from "express";
import cors from "cors";
import {db} from "./firebase.js";

const app=express();
app.use(cors());app.use(express.json())


async function getInventory(req,res)
{
    const snapshot=await db.collection("inventory").get();
    const inventory=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
    res.json(inventory);
}

async function getUsers(req,res)
{
    const snapshot=await db.collection("users").get();
    const users=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
    res.json(users);
}

app.get("/api/users",getUsers);
app.get("/api/inventory",getInventory);

const PORT=5000;
app.listen(PORT,()=>console.log('Backend started at',PORT));

