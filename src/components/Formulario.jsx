import {useState, useEffect} from "react"
import Alerta from "./Alerta";

const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  const generarID = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36);

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true)
      return
    }
    
    setError(false)

    //Objeto de paciente
    const objetoPaciente = {
      "nombre": nombre,
      "propietario": propietario,
      "email": email,
      "fecha": fecha,
      "sintomas": sintomas,
    }

    if (paciente.id) {
      //Editando el registro
      objetoPaciente.id = paciente.id

      //Creando un arreglo con pacientes actualizados
      const pacientesActualizados = pacientes.map((pacienteState) => pacienteState.id ===
      objetoPaciente.id ? objetoPaciente : pacienteState)

      //Seteando ese arreglo actualizado
      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      //Nuevo registro
      objetoPaciente.id = generarID()
      setPacientes([...pacientes, objetoPaciente])
    }

    
    //Reiniciar Forms
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mb-4">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>      
      
      <p className="text-lg mt-5 text-center font-sans">
        Añade Pacientes y {''}
        <span className="text-purple-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md py-10 px-5 mt-10 mx-5"
      >

        {error && 
            <Alerta> <p>Todos los campos son obligatorios</p></Alerta>
        }

        <div>
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange = { (e) => setNombre(e.target.value) }
          />

          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold mt-4">Nombre propietario</label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange = { (e) =>setPropietario(e.target.value) }
          />

          <label htmlFor="email" className="block text-gray-700 uppercase font-bold mt-4">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold mt-4">Alta</label>

          <input
            id="alta"
            type="date"
            placeholder="Fecha de alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <label htmlFor="sintomnas" className="block text-gray-700 uppercase font-bold mt-4">Síntomas</label>

          <textarea
            id="sintomas"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />

          <input type="submit"
            className=" mt-5 w-full text-center p-3 text-white 
            uppercase font-bold cursor-pointer
            transition ease-in-out delay-100 bg-indigo-600 hover:bg-indigo-700 duration-300"
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          />

        </div>
      </form>

    </div>
  )
}

export default Formulario