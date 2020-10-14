import React, { useState, useRef } from 'react';
import { Form } from '@rocketseat/unform';
import { FormHandles } from '@unform/core';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [pass, setPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        name: Yup.string().required('Nome obrigatório'),
        oldPass: Yup.string(),
        pass: Yup.string().when('oldPass', {
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        confirmPass: Yup.string()
          .when('pass', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('pass'), undefined], 'As senhas estão diferentes'),
      }).defined();

      await api.put('/users', { name, oldPass, pass, confirmPass });
      addToast({
        type: 'success',
        title: 'Alteração de senha',
        description: 'Sua senha foi alterada com sucesso.',
      });
    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar a senha. Tente novamente',
      });
    }
  }

  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div>
            <h5>Dados do Perfil</h5>
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user-edit"></i>
                  </span>
                  <InputText
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    placeholder="Nome Completo"
                  />
                </div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-envelope"></i>
                  </span>
                  <InputText value={email} placeholder="Email" disabled />
                </div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <InputText
                    type="password"
                    onChange={e => setOldPass(e.currentTarget.value)}
                    placeholder="Senha atual"
                  />
                </div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <Password
                    promptLabel="Entre com sua senha"
                    weakLabel="Fraca"
                    mediumLabel="Média"
                    strongLabel="Forte"
                    onChange={e => setPass(e.currentTarget.value)}
                    placeholder="Nova senha"
                  />
                </div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <InputText
                    type="password"
                    onChange={e => setConfirmPass(e.currentTarget.value)}
                    placeholder="Confirme a senha"
                  />
                </div>
                <Button
                  className="button"
                  type="submit"
                  label="Alterar"
                  icon="pi pi-save"
                  iconPos="right"
                />
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Profile;
