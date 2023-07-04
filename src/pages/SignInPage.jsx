import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInUp = (e) => {
    e.preventDefault();
    const saveData = {
      userEmail: email,
      userPassword: password,
    };
    const request = fetch("http://localhost:5173/", {
      email,
      password,
    });
    request.then(() => {
      navigate("/home", { state: { data: Response.data } });
    });
    request.catch(() => {
      window.location.reload("erro ao cadastrar usuário, tente novamente");
    });
  };

  return (
    <SingInContainer>
      <form onSubmit={signInUp}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
