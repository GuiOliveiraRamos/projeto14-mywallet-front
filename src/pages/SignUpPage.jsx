import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const signInUp = (e) => {
    e.preventDefault();
    const saveData = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userConfirmPassword: confirmPassword,
    };
    if (password !== confirmPassword) {
      return alert("as senhas devem ser iguais");
    }
    const request = fetch("http://localhost:5173/", {
      name,
      email,
      password,
      confirmPassword,
    });
    request.then(() => {
      navigate("/", { state: { data: saveData } });
    });
    request.catch(() => {
      window.location.reload("erro ao cadastrar usuário, tente novamente");
    });

    console.log(saveData);
  };

  return (
    <SingUpContainer>
      <form onSubmit={signInUp}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
