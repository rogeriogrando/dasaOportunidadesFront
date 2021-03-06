import React, { useCallback, useRef } from 'react';
import { FiFrown, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.png';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';

import getValidationErros from '../../utils/getValidationErros';

import { Container, Content, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um ao fazer login, cheque as credenciais e seu e-mail para saber se sua conta foi ativada.',
        });
      }
    },
    [signIn, addToast, history],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Faesb" style={{ width: '130px' }} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1 style={{ marginLeft: '55px' }}>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password" style={{ marginLeft: '90px' }}>Esqueci minha senha :(

            </Link>
              <Link to="/signupaluno">
            <FiArrowRight />
              Criar conta aluno
            </Link>
            <Link to="/signupempresa">
              <FiArrowRight />
                Criar conta empresa
            </Link>
            <Link to="/dashboard-about">
             <FiArrowRight style={{ backgroundColor: '#0e58a4' }} />
              Saiba mais
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
