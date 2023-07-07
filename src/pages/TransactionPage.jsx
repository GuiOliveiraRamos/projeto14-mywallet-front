import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import contextData from "./DataContext";
export default function TransactionsPage() {
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const tipo = window.location.pathname.includes("entrada")
    ? "entrada"
    : "saida";
  const title = tipo === "entrada" ? "Nova entrada" : "Nova saída";
  const finalizar = tipo === "entrada" ? "Entrada" : "Saída";
  const { token } = useContext(contextData);

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      valor: parseFloat(valor),
      descricao: descricao,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`,
        formData,
        config
      );

      localStorage.setItem("userData", JSON.stringify(formData));
      navigate("/home");
    } catch (error) {
      if (error.response.status === 422 || error.response.status === 401) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <TransactionsContainer>
      <h1>{title}</h1>
      <form onSubmit={formSubmit}>
        <input
          data-test="registry-amount"
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button data-test="registry-save" type="submit">
          Salvar {finalizar}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
