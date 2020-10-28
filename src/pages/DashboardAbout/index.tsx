import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';
import logoImg from '../../assets/logo.png';
import carlaImg from '../../assets/carla_so.jpeg';
import celioImg from '../../assets/celio_so.jpeg';
import rogerioImg from '../../assets/rogerio_so.jpg';


const DashboardAbout: React.FC = () => {

  return (
    <>
      <Container>
      <img src={logoImg} alt="Faesb"  />
      <span>
          <p>
            Em consonância com a missão da FAESB que é educacional, cultural e
            social, o projeto "Banco de Oportunidades-FAESB" visa proporcionar
            um canal entre alunos, egressos e oportunidades de mercado na região
            de atuação da Faesb.
          </p>
          <p>
            O projeto surge como uma ponte para ligar nossos alunos e egressos a
            oportunidades oferecidas pelas empresas parceiras da Faesb. O projeto
            também agrega valor para as empresas parceiras na medida em que
            oferece um banco de dados sólido com mão de obra especializada.
          </p>
        </span>

        <img src={carlaImg} alt="Faesb" />
        <p>
          Carla Barreto
        </p>

        <p>
          Doutora em Educação Escolar (Linha de pesquisa "Política e Gestão Educacional"), pela UNESP.
          Mestre em Educação, Área de Fundamentos da Educação, linha de Pesquisa Estado e Política Educacional pela UFSCar.
          Graduada em Ciências Sociais (Licenciatura e Bacharelado - UNESP).
          Participou ativamente do projeto viabilizando seu desenvolvimento.
        </p>

        <img src={celioImg} alt="Faesb" />
        <p>
          Célio de Castro
        </p>
        <p>
        	Mestre em Administração pelo Programa de Pós Graduação em Administração (PPGA UNIMEP),
          possui especialização em Marketing (MBA) - Fundação Getúlio Vargas (2012),
          graduação em Administração de Empresas - Faculdades Integradas Brasileiras (2007).
          Idealizador do projeto, contruindo a base de regras de negócio com requisitos funcionais do sistema.
        </p>

        <img src={rogerioImg} alt="Faesb" />
        <p>
          Rogério Grando
        </p>
        <p>
          Esp. Banco de Dados Oracle pele IBTA, MBA em Segurança da informação pele VERIS e Ciência da Computação pela Escola de Engenharia de Piracicaba (2006).
          Desenvolvedor do projeto.
        </p>
        <Link to="/">
            <FiArrowLeft />
            Voltar
        </Link>


      </Container>


    </>
  );
};

export default DashboardAbout;
