import React, { useState, useRef, useEffect } from 'react';
import { FormHandles } from '@unform/core';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';

import { useToast } from '../../hooks/toast';
import { Container } from './styles';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Header from '../../components/HeaderCompany';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

interface IJob {
  id: number;
  office: string;
  mainAtributions: string;
  workload: string;
  workSchedule: string;
  benefits: string;
  remuneration: number;
  requirements: string;
  desirable: string;
  minimumAge: number;
  maximumAge: number;
  applicationDeadline: Date | undefined;
  active: boolean;
}

const CompanyJobs: React.FC = () => {
  const { signOut, user } = useAuth();
  const [job, setJob] = useState<IJob | undefined>(undefined);
  const [jobs, setJobs] = useState([]);
  const [id, setId] = useState();
  const [office, setOffice] = useState('');
  const [mainAtributions, setMainAtributions] = useState('');
  const [workload, setWorkload] = useState(undefined);
  const [workSchedule, setWorkSchedule] = useState('');
  const [benefits, setBenefits] = useState('');
  const [remuneration, setRemuneration] = useState<number | undefined>();
  const [requirements, setRequirements] = useState('');
  const [desirable, setDesirable] = useState('');
  const [minimumAge, setMinimumAge] = useState<number | undefined>();
  const [maximumAge, setMaximumAge] = useState<number | undefined>();
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [active, setActive] = useState(true);
  const [loadJobs, setLoadJobs] = useState('');
  const [jobDialog, setJobDialog] = useState(false);

  const { addToast } = useToast();
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (user.category !== 'company') {
      signOut();
    }
    async function getJobs() {
      try {
        const { data } = await api.get('/company-jobs-inactive');
        data.map( (items: any)  => {
          const newDateFormat =
          items.applicationDeadline.substr(8, 2) +
          '/' +
          items.applicationDeadline.substr(5, 2) +
          '/' +
          items.applicationDeadline.substr(0, 4);
          items.applicationDeadline = newDateFormat
        })
        setJobs(data);
      } catch (error) {}
    }
    getJobs();
  }, [loadJobs]);

  function hideDialog() {
    setId(undefined);
    setOffice('');
    setMainAtributions('');
    setWorkload(undefined);
    setWorkSchedule('');
    setBenefits('');
    setRemuneration(undefined);
    setRequirements('');
    setDesirable('');
    setMinimumAge(undefined);
    setMaximumAge(undefined);
    setApplicationDeadline('');
    setActive(true);
    setJobDialog(true);
  }

  function hideOffDialog() {
    setJobDialog(false);
  }

  function renderFooter(name: string) {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => {
            setJobDialog(false);
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

  function editJob(rowData: any) {
    const {
      id,
      office,
      mainAtributions,
      workload,
      workSchedule,
      benefits,
      remuneration,
      requirements,
      desirable,
      minimumAge,
      maximumAge,
      applicationDeadline,
      active,
    } = rowData;


    setId(id);
    setOffice(office);
    setMainAtributions(mainAtributions);
    setWorkload(workload);
    setWorkSchedule(workSchedule);
    setBenefits(benefits);
    setRemuneration(remuneration);
    setRequirements(requirements);
    setDesirable(desirable);
    setMinimumAge(minimumAge);
    setMaximumAge(maximumAge);
    setApplicationDeadline(applicationDeadline);
    setActive(active);
    setJobDialog(true);
  }

  function actionBodyTemplate(rowData: any) {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editJob(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteJob(rowData)}
        />
      </>
    );
  }

  async function handleSubmit() {
    try {
      formRef.current?.setErrors({});
      Yup.object({
        office: Yup.string().required('Cargo obrigatória'),
        mainAtributions: Yup.string().required(
          'Principais atribuições obrigatório',
        ),
        workload: Yup.string().required('Carga horária obrigatória'),
        workSchedule: Yup.string().required('Periodo obrigatório'),
        benefits: Yup.string().required('Benefícios obrigatório'),
        applicationDeadline: Yup.string().required(
          'Validade da vaga obrigatória',
        ),
      }).defined();

      const response = await api.put('/company-jobs-inactive/' + id, {
        office,
        mainAtributions,
        workload,
        workSchedule,
        benefits,
        remuneration,
        requirements,
        desirable,
        minimumAge,
        maximumAge,
        applicationDeadline,
        active,
      });


      addToast({
        type: 'success',
        title: 'Vaga de emprego',
        description: 'Dados gravados com sucesso.',
      });
      setLoadJobs(response.data);
      setJobDialog(false);
      history.push('/company-jobs-inactive');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro ao gravar nova vaga',
        description: 'Ocorreu ao gravar seus dados. Tente novamente',
      });
    }
  }


  async function deleteJob(rowData: any) {
    const { id } = rowData;
    const response = await api.delete(
      '/company-jobs-inactive/' + id,
    );
    setLoadJobs(response.data);
  }

  return (
    <>
      <Header end={<h3>Bem vindo: {user.name} </h3>}></Header>
      <Container>
        <div className="datatable-crud-demo">
          <div className="card">
            <h5>Vagas Inativas</h5>
            <DataTable
              value={jobs}
              dataKey="id"
              paginator
              rows={3}
              rowsPerPageOptions={[3, 6, 9]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} vagas"
            >
              <Column field="office" header="Cargo" sortable></Column>
              <Column field="applicationDeadline" header="Prazo" sortable></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
          </div>
        </div>

        <Dialog
          visible={jobDialog}
          style={{ width: '700px' }}
          header="Vaga de Emprego"
          modal
          className="p-fluid"
          onHide={hideOffDialog}
          footer={renderFooter('displayBasic')}
        >
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

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Principais Atribuições</label>
            <InputTextarea
              value={mainAtributions}
              onChange={e =>
                setMainAtributions((e.target as HTMLTextAreaElement).value)
              }
              rows={5}
              cols={30}
              autoResize
              className={!mainAtributions ? 'p-invalid p-d-block' : ''}
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Carga Horária Semanal</label>
            <InputNumber
              id="minmax-buttons"
              value={workload}
              onValueChange={e => setWorkload(e.value)}
              mode="decimal"
              showButtons
              min={0}
              max={48}
              className={!workload ? 'p-invalid p-d-block' : ''}
            />
          </div>

          <div className="p-field">
            <label htmlFor="name">Período</label>
            <InputText
              id="name"
              value={workSchedule}
              placeholder="Ex.: Das 08:00 às 17:30"
              onChange={e => setWorkSchedule(e.currentTarget.value)}
              required
              autoFocus
              className={!workSchedule ? 'p-invalid p-d-block' : ''}
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Benefícios</label>
            <InputTextarea
              value={benefits}
              onChange={e =>
                setBenefits((e.target as HTMLTextAreaElement).value)
              }
              rows={5}
              cols={30}
              autoResize
              className={!benefits ? 'p-invalid p-d-block' : ''}
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Remuneração</label>
            <InputNumber
              id="locale-br"
              placeholder="R$"
              value={remuneration}
              onValueChange={e => setRemuneration(e.value)}
              mode="decimal"
              locale="pt-BR"
              minFractionDigits={2}
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Requisitos Mínimos</label>
            <InputTextarea
              value={requirements}
              onChange={e =>
                setRequirements((e.target as HTMLTextAreaElement).value)
              }
              rows={5}
              cols={30}
              autoResize
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Requisitos Desejáveis</label>
            <InputTextarea
              value={desirable}
              onChange={e =>
                setDesirable((e.target as HTMLTextAreaElement).value)
              }
              rows={5}
              cols={30}
              autoResize
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Idade Mínima</label>
            <InputNumber
              id="minmax-buttons"
              value={minimumAge}
              onValueChange={e => setMinimumAge(e.value)}
              mode="decimal"
              showButtons
              min={0}
              max={200}
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="locale-br">Idade Máxima</label>
            <InputNumber
              id="minmax-buttons"
              value={maximumAge}
              onValueChange={e => setMaximumAge(e.value)}
              mode="decimal"
              showButtons
              min={0}
              max={200}
            />
          </div>

          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="name">Prazo para Inscrição</label>
            <InputMask
              id="applicationDeadline"
              mask="99/99/9999"
              value={applicationDeadline}
              placeholder="dd/mm/aaaa"
              slotChar="dd/mm/aaaa"
              onChange={e => setApplicationDeadline(e.value)}
              className={!applicationDeadline ? 'p-invalid p-d-block' : ''}
            ></InputMask>
          </div>

          <div className="card">
            <label htmlFor="name">Ativo para candidatos</label>
            <div className="p-field-checkbox p-m-0">
              <ToggleButton
                checked={active}
                onChange={e => setActive(e.value)}
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                onLabel="Sim"
                offLabel="Não"
                style={{ width: '10em' }}
              />
            </div>
          </div>
        </Dialog>
      </Container>
    </>
  );
};

export default CompanyJobs;
