import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config()

const app = express()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});

app.get("/", (req, res) => {
    res.send("Hola desde mi primer servidor!");
});

app.get("/tareas", async (req, res) => {
    const resultado = await pool.query(
        "SELECT * FROM tareas"
    );

    res.status(200).json({mensaje: "tareas: ", datos: resultado.rows});
});

app.post("/tareas", async (req, res) => {
    const {titulo, hecha} = req.body;

    const task = await pool.query(
        "INSERT INTO tareas (titulo, hecha) VALUES ($1, $2) RETURNING *",
        [titulo, hecha]
    );

    res.status(201).json({mensaje:"tarea creada con exito", datos: task.rows[0]});
});

app.delete("/tareas/:id", async (req, res) => {
    const { id } = req.params;
    const task = await pool.query("DELETE FROM tareas WHERE id = $1 RETURNING *", [id]);
    res.json({mensaje: "hemos borrado: ", datos: task.rows[0]});
})

app.put("/tareas/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, hecha } = req.body;
    const task = await pool.query("UPDATE tareas SET titulo = $2, hecha = $3 WHERE id = $1 RETURNING *", [id, titulo, hecha]);
    res.json({mensaje: "hemos actualizado la tarea", datos:task.rows[0]});
})