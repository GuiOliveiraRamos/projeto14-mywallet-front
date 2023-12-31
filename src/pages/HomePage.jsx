import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import contextData from "./DataContext";
import { number } from "prop-types";

export default function HomePage() {
  const navigate = useNavigate();
  const { name } = useContext(contextData);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/");
    } else {
      const { token } = JSON.parse(userData);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(`${import.meta.env.VITE_API_URL}/home`, config)
        .then((res) => {
          setTransactions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    let newBalance = 0;
    transactions.forEach((transaction) => {
      if (transaction.tipo === "entrada") {
        newBalance += transaction.valor;
      } else {
        newBalance -= transaction.valor;
      }
    });
    setBalance(newBalance);
  }, [transactions]);

  const Logout = () => {
    localStorage.removeItem("userData");
    console.log(localStorage);
    navigate("/");
  };

  function Delete(transactionId) {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/");
    } else {
      const { token } = JSON.parse(userData);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const confirm = window.confirm(
        "Excluir essa transação? Essa operação não pode ser desfeita!"
      );
      if (confirm) {
        axios
          .delete(
            `${import.meta.env.VITE_API_URL}/home/${transactionId}`,
            config
          )
          .then(() => {
            const updatedList = transactions.filter(
              (t) => t._id !== transactionId
            );
            setTransactions(updatedList);
          })
          .catch((error) => {
            if (error.status === 401) {
              Logout();
            }
            console.log(error);
          });
      }
    }
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit data-test="logout" onClick={Logout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions
            .map((transaction) => (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{transaction.date}</span>
                  <strong data-test="registry-name">
                    {transaction.descricao}
                  </strong>
                </div>
                <Value
                  data-test="registry-amount"
                  color={
                    transaction.tipo === "entrada" ? "positivo" : "negativo"
                  }
                >
                  {Number(transaction.valor).toFixed(2).replace(".", ",")}
                  <DeleteButton
                    data-test="registry-delete"
                    onClick={() => Delete(transaction._id)}
                  >
                    x
                  </DeleteButton>
                </Value>
              </ListItemContainer>
            ))
            .reverse()}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value
            data-test="total-amount"
            color={balance >= 0 ? "positivo" : "negativo"}
          >
            {Number(balance).toFixed(2).replace(".", ",")}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button
          data-test="new-income"
          onClick={() => navigate("/nova-transacao/entrada")}
        >
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>

        <button
          data-test="new-expense"
          onClick={() => navigate("/nova-transacao/saida")}
        >
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  div span {
    color: #c6c6c6;
    margin-right: 16px;
  }
`;
const DeleteButton = styled.div`
  color: #c6c6c6;
  cursor: pointer;
`;
