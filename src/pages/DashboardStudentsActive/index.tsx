import React from 'react';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';
import { Link  } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


const DashboardStudentsActive: React.FC = () => {

  return (
    <>
      <Container>
        <img src={logoImg} alt="Faesb" style={{ width: '150px' }} />

        <h1>PORTAL DE OPORTUNIDADES FAESB</h1>
        <p></p>
        <span>
          <p>
            Um e-mail foi encaminhado para ativação da sua conta, verifique sua caixa de e-mail ou span.
            Caso não tenha recebido o e-mail entre em contato com a Faesb para verificar se existe algum problema com a criação da sua conta.
          </p>
        </span>

        <p></p>
        <Link to="/">  <p>Voltar para login</p> </Link>
      </Container>
    </>
  );
};

export default DashboardStudentsActive;
