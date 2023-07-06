import React from "react";
import { Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      valor: e.target.valor.value,
      descricao: e.target.descricao.value,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert(response.statusText);
        }
        if (response.status === 422) {
          alert(response.statusText);
        }
      } else {
        const data = await request.json();
        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={formSubmit}>
        <input placeholder="Valor" type="text" name="valor" />
        <input placeholder="Descrição" type="text" name="descricao" />
        <button>Salvar TRANSAÇÃO</button>
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
