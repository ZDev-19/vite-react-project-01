import { useEffect } from "react"
import Paciente from "./Paciente"

const ListadoPacientes = ({ pacientes , setPaciente, eliminarPaciente}) => {

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

            {pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

                    <p className="text-lg mt-5 mb-10 text-center font-sans">
                        Administra tus {''}
                        <span className="text-purple-600 font-bold text-xl">Pacientes y Citas</span>
                    </p>

                    {pacientes.map((paciente) => (
                        <Paciente
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                            eliminarPaciente = {eliminarPaciente}
                        />
                    )
                    )}
                </>

            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>

                    <p className="text-lg mt-5 mb-10 text-center font-sans">
                        Comienza agregando pacientes {''}
                        <span className="text-purple-600 font-bold text-xl">Y aparecerán en este lugar</span>
                    </p>

                </>
            )}
        </div>
    )
}

export default ListadoPacientes