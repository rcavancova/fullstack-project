import { useEffect, useState } from 'react'
import './App.css'

function App() {
  interface Tarea {
    id: number;
    titulo: string;
    hecha: boolean;
  }

  const [tareas, setTareas] = useState<Tarea[]>([]);     //Lista de tareas
  
  async function cargarTareas() {
    const res = await fetch("http://localhost:3000/tareas");
    const estructura = await res.json();
    setTareas(estructura.datos);
  }

  // eslint-disable-next-line
  useEffect(() => { cargarTareas(); }, []);

  const [titulo, setTitulo] = useState("");

  async function agregarTarea() {
    await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: titulo, hecha: false })
    });
    setTitulo("");
    cargarTareas();
  }

  async function borrarTarea(id:number) {
    await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    cargarTareas();
  }

  return (
    <>
      <h1>Tareas</h1>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.titulo} {tarea.hecha ? "✅" : "❌"}
            <button onClick={()=>borrarTarea(tarea.id)}>Borrar</button>
          </li>
        ))}
      </ul>

      <input
      value={titulo}
      onChange={(e)=>setTitulo(e.target.value)}
      />
      <button onClick={() => agregarTarea()}>Agregar</button>

    </>
  )
}

export default App
