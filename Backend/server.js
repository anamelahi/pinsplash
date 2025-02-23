import express from 'express';
import axios from "axios";
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from "pg"
import env from "dotenv"



const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.PORT,
})

db.connect();

app.use(express.json()); // Parse JSON bodies
app.use(cors());
app.use(bodyParser.json()); 

app.get("/collections", async (req, res) => {
    try {
        let collectionsQuery = await db.query(`
            SELECT DISTINCT collection_name FROM collection_images
        `);
        
        let imagesQuery = await db.query(`
            SELECT collection_name, image_url FROM collection_images
        `);

        let collections = collectionsQuery.rows.map(collection => {
            let images = imagesQuery.rows.filter(img => img.collection_name === collection.collection_name);
            return {
                collection_name: collection.collection_name,
                thumbnail: images.length > 0 ? images[0].image_url : null // Use the first image as a thumbnail
            };
        });

        res.json(collections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.post("/collections", async (req, res) => {
    let { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Collection name is required" });
    }

    try {
        let query = await db.query("INSERT INTO collections (collection_name) VALUES ($1) RETURNING *", [name]);
        res.status(201).json(query.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/collections/:collection_name/add-image", async (req, res) => {
    const { collection_name } = req.params;
    const { image_url } = req.body;

    if (!image_url) {
        return res.status(400).json({ error: "Image URL is required" });
    }

    try {
        let query = await db.query(
            "INSERT INTO collection_images (collection_name, image_url) VALUES ($1, $2) RETURNING *",
            [collection_name, image_url]
        );

        res.status(201).json(query.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})