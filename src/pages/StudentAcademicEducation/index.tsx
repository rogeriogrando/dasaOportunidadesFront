import React, { useState, useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { useToast } from '../../hooks/toast';
import { Container } from './styles';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import { InputMask } from 'primereact/inputmask';

interface ICourse {
  id: number;
  institution: string;
  description: string;
  initialYear: string;
  finalYear: string;
}

const StudentAcademicEducation: React.FC = () => {
  const { signOut, user } = useAuth();
  const [course, setCourse] = useState<ICourse | undefined>(undefined);
  const [courses, setCourses] = useState([]);
  const [id, setId] = useState();
  const [institution, setInstitution] = useState('');
  const [description, setDescription] = useState('');
  const [loadCourses, setLoadCourses] = useState([]);
  const [initialYear, setInitialYear] = useState('');
  const [finalYear, setFinalYear] = useState('');
  const [courseDialog, setCourseDialog] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'aluno') {
      signOut();
    }
    async function getAcademicEducation() {
      try {
        const response = await api.get('/students-academic-education');
        setCourses(response.data);
      } catch (error) {}
    }
    getAcademicEducation();
  }, [loadCourses]);

  function hideDialog() {
    setInstitution('');
    setDescription('');
    setInitialYear('');
    setFinalYear('');
    setId(undefined);
    setCourseDialog(true);
  }

  function hideOffDialog() {
    setCourseDialog(false);
  }

  function renderFooter(name: string) {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => {
            setCourseDialog(false);
          }}
          className="p-button-text"
        />
        <Button
          label="Salvar"
          icon="pi pi-check"
          onClick={handleSubmit}
          autoFocus
        />
      </div>
    );
  }

  function editCourse(rowData: any) {
    const { id, institution, description, initialYear, finalYear } = rowData;
    setId(id);
    setInstitution(institution);
    setDescription(description);
    setInitialYear(initialYear);
    setFinalYear(finalYear);
    setCourseDialog(true);
  }
  async function deleteCourse(rowData: any) {
    const { id } = rowData;
    const response = await api.delete('/students-academic-education/' + id);
    setLoadCourses(response.data);
  }

  function actionBodyTemplate(rowData: any) {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editCourse(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteCourse(rowData)}
        />
      </>
    );
  }

  function nextItem() {
    history.push('/students-additional-training');
  }

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        institution: Yup.string().required('Instituição obrigatória'),
        description: Yup.string().required('Curso obrigatório'),
        initialYear: Yup.string().required('Data inicial obrigatória'),
        finalYear: Yup.string().required(
          'Data de Conclusão/Previsão obrigatório',
        ),
      }).defined();
      console.log(id);
      let response;
      if (!id) {
        response = await api.post('/students-academic-education', {
          institution,
          description,
          initialYear,
          finalYear,
        });
      } else {
        response = await api.put('/students-academic-education/' + id, {
          institution,
          description,
          initialYear,
          finalYear,
        });
      }

      addToast({
        type: 'success',
        title: 'Dados pessoais',
        description: 'Dados gravados com sucesso.',
      });
      setLoadCourses(response.data);
      setCourseDialog(false);
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
        <div className="datatable-crud-demo">
          <div className="card">
            <h5>Dados de Formação</h5>
            <div className="insertEducation">
              <Button
                label="Inserir Curso"
                icon="pi pi-plus"
                className="p-button-success p-mr-2"
                onClick={() => {
                  hideDialog();
                }}
              />
            </div>
            <DataTable
              value={courses}
              dataKey="id"
              paginator
              rows={3}
              rowsPerPageOptions={[3, 6, 9]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
              <Column field="institution" header="Instituição"></Column>
              <Column field="description" header="Curso"></Column>
              <Column field="initialYear" header="Ano de inicio"></Column>
              <Column field="finalYear" header="Ano termino/previsão"></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
            <Button
              className="button-next"
              type="submit"
              label="Grava >> Sessão Conhecimentos Adicionais"
              icon="pi pi-save"
              iconPos="right"
              onClick={nextItem}
            />
          </div>
        </div>

        <Dialog
          visible={courseDialog}
          style={{ width: '450px' }}
          header="Formação Acadêmica"
          modal
          className="p-fluid"
          onHide={hideOffDialog}
          footer={renderFooter('displayBasic')}
        >
          <div className="p-field">
            <label htmlFor="name">Instituição</label>
            <InputText
              id="name"
              value={institution}
              onChange={e => setInstitution(e.currentTarget.value)}
              required
              autoFocus
              className={!institution ? 'p-invalid p-d-block' : ''}
            />
          </div>

          <div className="p-field">
            <label htmlFor="name">Nome do curso</label>
            <InputText
              id="name"
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
              required
              autoFocus
              className={!description ? 'p-invalid p-d-block' : ''}
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Ano inicial</label>
            <InputMask
              mask="9999"
              value={initialYear}
              onChange={e => setInitialYear(e.value)}
              className={!initialYear ? 'p-invalid p-d-block' : ''}
            ></InputMask>
            <label htmlFor="description">Ano de previsão/conclusão</label>
            <InputMask
              mask="9999"
              value={finalYear}
              onChange={e => setFinalYear(e.value)}
              className={!finalYear ? 'p-invalid p-d-block' : ''}
            ></InputMask>
          </div>
        </Dialog>
      </Container>
    </>
  );
};

export default StudentAcademicEducation;
