import { useContext,useRef } from "react"
import UserContext from "../../context/userContext"
import { Link } from "react-router-dom";
export const Login = () => {
    const { updateUser } = useContext(UserContext);
    const datForm = useRef()



    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        const login = async()=>{
            try {
                const response = await fetch('http://localhost:4000/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(cliente)
                });
                if (response.status===200){
                    const data = await response.json();
                    const userData = data.user;
                    updateUser(userData)
                    console.log(updateUser)
                    document.cookie = `loguedUser=${data.user.email};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
                    console.log(document.cookie);
                    window.location.href = "/chat"
                }else{
                    console.log("Error en tus credenciales");
                }

              } catch (error) {
                console.error(error);
              }
              
              e.target.reset(); //Reset form
        }
        login();

          
    }
    return (
        <div className="container divForm " >
            <div className="separacionNavbar">
            <h3>Formulario de Inicio de Sesion</h3>
            <form className="formularioLogin" onSubmit={consultarForm} ref={datForm}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" />
                </div>
                
                <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                <Link className="btn btn-primary" to="/forgottenPassword">Olvidaste tu contraseña?</Link>
            </form>

            </div>
        </div>
    )
}