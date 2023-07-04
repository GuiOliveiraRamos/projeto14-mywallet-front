import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInUp = async (e) => {
    e.preventDefault();
    const saveData = {
      userEmail: email,
      userPassword: password,
    };

    try {
      const request = await fetch("http://localhost:5173/", {
        email,
        password,
      });
      navigate("/home", { state: { data: request.data } });
    } catch (error) {
      window.location.reload("erro ao cadastrar usuário, tente novamente");
    }
    console.log(saveData);
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
