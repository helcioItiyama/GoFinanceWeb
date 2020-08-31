import React from 'react';
import Dashboard from '../../pages/Dashboard';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';
import { render, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const apiMock = new AxiosMock(api);

describe('Dashboard Page', () => {
  beforeEach(cleanup);

  it('should be able to list income from api', async () => {
    apiMock.onGet('/incomes').reply(200, [
      {
        "id": "1",
        "type": "renda-variavel",
        "value": "1200",
        "user_id": "5e572267-9522-460b-bafd-2d81da2af0b2",
        "date": "2020-08-04T00:00:00.000Z",
      }
    ]);

    const { getByText} = render(<Dashboard/>);

    await waitFor(() => expect(getByText('[04-08-2020]')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('R$ 1,200.00')).toBeTruthy();
  });

  it('should be able to add new income', async () => {
    const { getByText, getByTestId } = render(<Dashboard/>);

    apiMock.onPost('/incomes').reply(200, {
      "id": "2",
      "type": "renda-fixa",
      "value": 3000,
      "date": 1598703953762
    });

    await act(async () => {
      fireEvent.click(getByTestId('submitButton-Adicionar'));
    });

    await waitFor(() => expect(getByText('[29-08-2020]')).toBeTruthy(), {
      timeout: 200
    });

    expect(getByText('R$ 3,000.00')).toBeTruthy();
  });


  it('should be able to set null the values after submiting', async () => {
    const { getByText, getByTestId } = render(<Dashboard/>);

    const selectOption = getByText('Escolha uma opção');
    const incomeInput = getByTestId('income');
    const dateInput = getByTestId('date');

    fireEvent.change(selectOption, {target: {value: 'renda-fixa'}});
    fireEvent.change(incomeInput, {target: {value: '15000'}});
    fireEvent.change(dateInput, {target: {value: '10/08/2020'}})

    await act(async () => {
      fireEvent.click(getByTestId('submitButton-Adicionar'));
    });

    expect(incomeInput).toHaveValue('');
    expect(dateInput).toHaveValue('');
  })

})

describe('Update Income', () => {
  it('should be able to edit an income value', async () => {
    apiMock.onGet('/incomes').reply(200, [{
      "id": "3",
      "type": "renda-fixa",
      "value": "400",
      "user_id": "5e572267-9522-460b-bafd-2d81da2af0b2",
      "date": "2020-08-29T00:00:00.000Z",
      }
    ]);

    const { getByText, getByTestId } = render(<Dashboard/>);

    await waitFor(() => expect(getByText('[29-08-2020]')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('R$ 400.00')).toBeTruthy();

    await act(async () => {fireEvent.click(getByTestId('editButton-Renda Fixa'));
    });

    apiMock.onPut('/incomes/3').reply(200, {
      "id": "3",
      "type": "renda-fixa",
      "value": 1000,
      "date": 1598872456023
    });

    await act(async () => {fireEvent.click(getByTestId('submitButton-Atualizar'));
    });

    await waitFor(() => expect(getByText('[31-08-2020]')).toBeTruthy(), {
      timeout: 200
    });

      expect(getByText('R$ 1,000.00')).toBeTruthy();
    });

});

describe('Delete Income', () => {
  it('should be able to delete an income value', async () => {
    apiMock.onGet('/incomes').reply(200, [{
      "id": "4",
      "type": "renda-fixa",
      "value": "400",
      "user_id": "5e572267-9522-460b-bafd-2d81da2af0b2",
      "date": "2020-08-29T00:00:00.000Z",
      }
    ]);

    const { getByText, getByTestId } = render(<Dashboard/>);

    await waitFor(() => expect(getByText('[29-08-2020]')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('R$ 400.00')).toBeTruthy();

    await act(async () => {fireEvent.click(getByTestId('deleteButton-Renda Fixa'));
    });

    apiMock.onDelete('/incomes/4').reply(204);

  });

});

