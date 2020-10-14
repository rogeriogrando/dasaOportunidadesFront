import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const imgOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translatey(-10px);
  }
  to {
    opacity: 1;
    transform: translatey(0px);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  animation: ${appearFromLeft} 1s;

  h5 {
    text-align: center;
    font-size: 34px;
    margin-bottom: 80px;
  }
  .insertExperiênciaProficional {
    display: flex;
    background-color: #fff;
    height: 70px;
    border-radius: 5px;
    button {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 15px;
    }
  }
  table {
    margin-top: 10px;
    .p-datatable-row .p-datatable .p-datatable-tbody {
      padding: 0;
    }
  }

  .p-datatable .p-datatable-tbody > tr > td {
    text-align: left;
    border: 1px solid #e9ecef;
    border-width: 0 0 1px 0;
    padding: 5px 5px;
  }

  button.button-next {
    display: flex;
    width: 100%;
    margin-top: 15px;
  }



  .job-item-content  {
    text-align: center;
    background-color: #fff;
    margin-left: 5px;
    border-radius: 5px;
    padding: 1rem 0;


    h4 {
      margin-top: 10px;
    }
    .p-button {
      color: #ffffff;
      margin-top: 15px;
      margin-bottom: 15px;
      width: 90%;
      background: #3c91df;
      border: 1px solid #3c91df;
      &:hover {
        background: ${shade(0.2, '#3C91DF')};
      }
    }


  }


    .p-dialog .p-dialog-header {
      background: #FFEFAB;
    }

    .p-dialog .p-dialog-footer {
      background: #FFEFAB;
    }
`;
