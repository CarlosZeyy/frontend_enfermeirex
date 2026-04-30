import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <div>
        <h1>EnfermeirEX</h1>
        <p>Sua saúde, no conforto de casa.</p>

        <p>Ja possui conta em nosso sistema? faça o login</p>
        <Link to={"/login"}>Login</Link>
        
        <p>Caso não tenha se cadastrado ainda faça o seu registro aqui</p>
        <Link to={"/register"}>Registrar</Link>

    </div>
  )
}

export default Welcome