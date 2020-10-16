import React, { useState, useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';

import { useToast } from '../../hooks/toast';
import { Container } from './styles';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Header from '../../components/HeaderStudent';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

const StudentProfessionalExperiences: React.FC = () => {
  const { signOut, user } = useAuth();
  const [id, setId] = useState();
  const [company, setCompany] = useState('');
  const [office, setOffice] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [resignationDate, setResignationDate] = useState('');
  const [reasonDismissal, setReasonDismissal] = useState<string | undefined>('');
  const [salary, setSalary] = useState(0);
  const [developedActivities, setDevelopedActivities] = useState('');
  const [experiencesDialog, setExperiencesDialog] = useState(false);
  const [experiencesLoad, setExperiencesLoad] = useState('');
  const [experiences, setExperiences] = useState([]);

  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'aluno') {
      signOut();
    }
    async function getProfissionalExperiences() {
      try {
        const {data} = await api.get('/students-profissional-experiences');
        data.map( (items: any)  => {
          const newAdmissionDate =
            items.admissionDate.substr(8, 2) +
            '/' +
            items.admissionDate.substr(5, 2) +
            '/' +
            items.admissionDate.substr(0, 4);
            items.admissionDate = newAdmissionDate;
          if(items.resignationDate) {
            const newResignationDate =
              items.resignationDate.substr(8, 2) +
              '/' +
              items.resignationDate.substr(5, 2) +
              '/' +
              items.resignationDate.substr(0, 4);
              items.resignationDate = newResignationDate;
          }

        })
        setExperiences(data);
      } catch (error) {}
    }
    getProfissionalExperiences();
  }, [experiencesLoad]);

  function hideDialog() {
    setId(undefined);
    setCompany('');
    setOffice('');
    setAdmissionDate('');
    setResignationDate('');
    setReasonDismissal('');
    setSalary(0);
    setDevelopedActivities('');
    setExperiencesDialog(true);
  }

  function hideOffDialog() {
    setExperiencesDialog(false);
  }

  function renderFooter(name: string) {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => {
            setExperiencesDialog(false);
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

  function editExperiences(rowData: any) {
    const {
      id,
      company,
      office,
      admissionDate,
      resignationDate,
      reasonDismissal,
      salary,
      developedActivities,
    } = rowData;
    setId(id);
    setCompany(company);
    setOffice(office);
    setAdmissionDate(admissionDate);
    setResignationDate(resignationDate);
    setReasonDismissal(reasonDismissal);
    setSalary(salary);
    setDevelopedActivities(developedActivities);
    setExperiencesDialog(true);
  }

  async function deleteExperiences(rowData: any) {
    const { id } = rowData;
    const response = await api.delete(
      '/students-profissional-experiences/' + id,
    );
    setExperiencesLoad(response.data);
  }

  function actionBodyTemplate(rowData: any) {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editExperiences(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteExperiences(rowData)}
        />
      </>
    );
  }

  async function viewCurriculum() {
    const blob = await api.get(`students-generate-curriculum`, {
      responseType: 'arraybuffer',
    });

    var newBlob = new Blob([blob.data], { type: 'application/pdf' });
    const data = window.URL.createObjectURL(newBlob);
    window.open(data, '_blank');
  }

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        company: Yup.string().required('Campo obrigatório'),
        office: Yup.string().required('Campo obrigatório'),
        admissionDate: Yup.string().required('Campo obrigatório'),
        developedActivities: Yup.string().required('Campo obrigatório'),
      }).defined();

      const newAdmissionDate =
        admissionDate.substr(3, 2) +
        '/' +
        admissionDate.substr(0, 2) +
        '/' +
        admissionDate.substr(6, 4);

      let newResignationDate = undefined;

      newResignationDate =
        resignationDate.substr(3, 2) +
        '/' +
        resignationDate.substr(0, 2) +
        '/' +
        resignationDate.substr(6, 4);

      if (newResignationDate === '//') {
        newResignationDate = null;
      }

      let response;
      if (!id) {
        response = await api.post('/students-profissional-experiences', {
          company,
          office,
          admissionDate: newAdmissionDate,
          resignationDate: newResignationDate,
          reasonDismissal,
          salary,
          developedActivities,
        });
      } else {
        response = await api.put('/students-profissional-experiences/' + id, {
          company,
          office,
          admissionDate: newAdmissionDate,
          resignationDate: newResignationDate,
          reasonDismissal,
          salary,
          developedActivities,
        });
      }

      addToast({
        type: 'success',
        title: 'Dados pessoais',
        description: 'Dados gravados com sucesso.',
      });
      setExperiencesLoad(response.data);
      setExperiencesDialog(false);
      history.push('/students-profissional-experiences');
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
            <h5>Experiências Profissionais</h5>
            <div className="insertExperiênciaProficional">
              <Button
                label="Inserir Experiência Proficional"
                icon="pi pi-plus"
                className="p-button-success p-mr-2"
                onClick={() => {
                  hideDialog();
                }}
              />
            </div>
            <DataTable
              value={experiences}
              dataKey="id"
              paginator
              rows={3}
              rowsPerPageOptions={[3, 6, 9]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
              <Column field="company" header="Empresa"></Column>
              <Column field="office" header="Cargo"></Column>
              <Column field="admissionDate" header="Data Admissão"></Column>
              <Column field="resignationDate" header="Data Demissão"></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
            <Button
              className="button-next"
              type="submit"
              label="Imprimir currículo"
              icon="pi pi-print"
              iconPos="right"
              onClick={viewCurriculum}
            />
          </div>
        </div>

        <Dialog
          visible={experiencesDialog}
          style={{ width: '650px' }}
          header="Experiência Profissional"
          modal
          className="p-fluid"
          onHide={hideOffDialog}
          footer={renderFooter('displayBasic')}
        >
          <div className="p-field">
            <label htmlFor="name">Empresa</label>
            <InputText
              id="name"
              value={company}
              onChange={e => setCompany(e.currentTarget.value)}
              required
              autoFocus
              className={!company ? 'p-invalid p-d-block' : ''}
            />
          </div>
          <div className="p-field">
            <label htmlFor="name">Cargo</label>
            <InputText
              id="name"
              value={office}
              onChange={e => setOffice(e.currentTarget.value)}
              required
              autoFocus
              className={!office ? 'p-invalid p-d-block' : ''}
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="name">Data de Admissão</label>
            <InputMask
              id="admissionDate"
              mask="99/99/9999"
              value={admissionDate}
              placeholder="dd/mm/aaaa"
              slotChar="dd/mm/aaaa"
              onChange={e => setAdmissionDate(e.value)}
              className={!admissionDate ? 'p-invalid p-d-block' : ''}
            ></InputMask>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="name">Data da Demissão</label>
            <InputMask
              id="resignationDate"
              mask="99/99/9999"
              value={resignationDate}
              placeholder="dd/mm/aaaa"
              slotChar="dd/mm/aaaa"
              onChange={e => setResignationDate(e.value)}
            ></InputMask>
          </div>
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Motivo da demissão</label>
            <InputTextarea
              value={reasonDismissal}
              onChange={e =>
                setReasonDismissal((e.target as HTMLTextAreaElement).value)
              }
              rows={5}
              cols={30}
              autoResize
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Salario</label>
            <InputNumber
              id="locale-br"
              value={salary}
              onValueChange={e => setSalary(e.value)}
              mode="decimal"
              locale="pt-BR"
              minFractionDigits={2}
            />
          </div>
          <label htmlFor="locale-br">Atividades exercidas</label>
          <InputTextarea
            value={developedActivities}
            onChange={e =>
              setDevelopedActivities((e.target as HTMLTextAreaElement).value)
            }
            rows={5}
            cols={30}
            autoResize
            className={!developedActivities ? 'p-invalid p-d-block' : ''}
          />
        </Dialog>
      </Container>
    </>
  );
};

export default StudentProfessionalExperiences;
