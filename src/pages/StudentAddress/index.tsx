import React, { useState, useRef, useEffect } from 'react';
import { FiBook, FiHome, FiMap, FiMapPin } from 'react-icons/fi';
import { Form } from '@rocketseat/unform';
import { FormHandles } from '@unform/core';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Container } from './styles';
import { useToast } from '../../hooks/toast';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

import Cities from '../../components/Cities/cities';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const StudentAddress: React.FC = () => {
  const { signOut, user } = useAuth();
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborHood, setNeighborHood] = useState('');
  const [city, setCity] = useState('');
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'aluno') {
      signOut();
    }
    async function getPersonalData() {
      try {
        const { data } = await api.get('/students-address');
        if (data) {
          setStreet(data.street);
          setNumber(data.number);
          setNeighborHood(data.neighborHood);
          setCity(data.city);
        }
      } catch (error) {}
    }
    getPersonalData();
  }, []);

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        street: Yup.string().required('Rua obrigatória'),
        number: Yup.string().required('Número obrigatório'),
        neighborHood: Yup.string().required('Bairro obrigatório'),
        city: Yup.string().required('Cidade obrigatória'),
      }).defined();

      const { data } = await api.get('/students-address');
      if (data) {
        await api.put('/students-address', {
          street,
          number,
          neighborHood,
          city,
        });
      } else {
        await api.post('/students-address', {
          street,
          number,
          neighborHood,
          city,
        });
      }

      addToast({
        type: 'success',
        title: 'Dados de endereço',
        description: 'Dados gravados com sucesso.',
      });
      history.push('/students-academic-education');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu ao gravar seus dados. Tente novamente',
      });
    }
  }


  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div className="card">
            <h5>Dados de Endereço</h5>
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <FiHome />
                  </span>
                  <InputText
                    value={street}
                    onChange={e => setStreet(e.currentTarget.value)}
                    placeholder="Rua / Av:"
                    className={!street ? 'p-invalid p-d-block' : ''}
                  />
                  <span className="p-inputgroup-addon">Nº</span>
                  <InputText
                    value={number}
                    onChange={e => setNumber(e.currentTarget.value)}
                    placeholder="Número"
                    className={!number ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-envelope"></i>
                  </span>
                  <InputText
                    value={neighborHood}
                    onChange={e => setNeighborHood(e.currentTarget.value)}
                    placeholder="Bairro"
                    className={!neighborHood ? 'p-invalid p-d-block' : ''}
                  />
                </div>
              </div>
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <FiMap />
                  </span>
                  <Dropdown value={city} options={Cities} onChange={ e => setCity(e.value) } optionLabel="name" placeholder="Select a City" />

                </div>
              </div>

              <Button
                className="button"
                type="submit"
                label="Gravar >> Sessão Formação"
                icon="pi pi-save"
                iconPos="right"
              />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default StudentAddress;
