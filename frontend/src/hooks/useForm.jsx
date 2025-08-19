/*
    HOOK PERSONALIZADO: useForm
    

    
*/
import React, {useState} from 'react'

// Custom hook
export const useForm = (objetoInicial) => {

    // Estado que contendrá los datos del formulario
    const [formularioSerializado, setFormularioSerializado] = useState(objetoInicial);    

    // Serializa un formulario. Devuelve un objeto con toda la información contenida
    const serializarFormulario = (formulario) => {

        // Obtengo el formData del formulario
        const datosDelFormulario = new FormData(formulario);

        // Creo un objeto vacio
        const objetoConLosDatosDelFormulario = {};

        // Voy recorriendo los datos del formulario y generando un objeto con su name y value
        for(let [name,value] of datosDelFormulario){
            objetoConLosDatosDelFormulario[name] = value;
        }

        // Devuelvo ya el objeto con los datos
        return objetoConLosDatosDelFormulario;

    }

    // Funcion recoge la información un formulario y le pasa el formulario entero para serializarlo
    const handleSubmit = (e) => {
        e.preventDefault();        
        setFormularioSerializado(serializarFormulario(e.target));        
    }

    // Funcion que va variando el estado a medida que estoy modificando los campos
    const handleChange = ({target}) => {
        const {name, value} = target;
        setFormularioSerializado({
            ...formularioSerializado,
            [name]: value
        });

    }

    // Devuelvo el estado y los métodos
    return {
        formularioSerializado,
        handleSubmit,
        handleChange
    }
}