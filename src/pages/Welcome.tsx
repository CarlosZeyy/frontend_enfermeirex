import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1 className="text-center font-semibold">
        Enferm<span className="text-red-600">EX</span>
      </h1>
      <p className="text-center font-medium pt-3">
        Sua saúde, no conforto de casa.
      </p>

      <p className="text-center">
        Ja possui conta em nosso sistema? faça o login
      </p>
      <Link to={"/login"} className="">
        Login
      </Link>

      <Link to={"/forgot-password"}>Esqueceu a senha?</Link>

      <p>Caso não tenha se cadastrado ainda faça o seu registro aqui</p>
      <Link to={"/register"}>Registrar</Link>
    </div>
  );
};

export default Welcome;
