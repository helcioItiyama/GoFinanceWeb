import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { IoMdCloseCircle } from 'react-icons/io';
import { Container, Modal } from './styles';

import FormWrapper from '../../components/FormWrapper';
import Form from '../../components/Form';
import Chart from '../../components/Chart';
import Header from '../../components/Header';
import IncomeData from '../../components/IncomeData';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import api from '../../services/api';

import {
  currencyFormat,
  dayMonthYearFormat,
  incomeUnformat,
} from '../../utils/format';

interface IIncomeData {
  id: string;
  type: string;
  value: string;
  date: string;
}

interface IFormattedIncomeData extends IIncomeData {
  formattedCurrency: string;
  formattedDate: string;
}

interface IAccumulator {
  fixIncomeType: IFormattedIncomeData[];
  variableIncomeType: IFormattedIncomeData[];
}

const Dashboard: React.FC = () => {
  const modalRef = useRef<HTMLFormElement>(null);

  const [data, setData] = useState<IIncomeData[]>([]);
  const [fixIncome, setFixIncome] = useState<IFormattedIncomeData[]>([]);
  const [variableIncome, setVariableIncome] = useState<IFormattedIncomeData[]>(
    [],
  );
  const [incomeEdit, setIncomeEdit] = useState<IIncomeData>();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/incomes');
        setData(response.data);
      } catch (err) {
        toast.error('Falha ao carregar dados');
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const { fixIncomeType, variableIncomeType } = data.reduce(
      (accumulator: IAccumulator, income: IIncomeData) => {
        const formattedCurrency = currencyFormat(Number(income.value));
        const formattedDate = dayMonthYearFormat(income.date);

        if (income.type === 'renda-variavel') {
          accumulator.variableIncomeType.push({
            ...income,
            formattedCurrency,
            formattedDate,
          });
        } else if (income.type === 'renda-fixa') {
          accumulator.fixIncomeType.push({
            ...income,
            formattedCurrency,
            formattedDate,
          });
        }
        return accumulator;
      },
      { fixIncomeType: [], variableIncomeType: [] },
    );

    setFixIncome(fixIncomeType);
    setVariableIncome(variableIncomeType);
  }, [data]);

  const handleSubmit = useCallback(
    async (event, { value, date, type }) => {
      event.preventDefault();
      try {
        const response = await api.post<IIncomeData>('/incomes', {
          type,
          value: incomeUnformat(value),
          date: new Date(date).getTime(),
        });

        let newData = [...data, response.data];

        newData.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        setData(newData);

        toast.success('Investimento cadastrado com sucesso!');
      } catch (err) {
        toast.error(
          'Não foi possível cadastrar o investimento. Tente novamente.',
        );
      }
    },
    [data],
  );

  const handleDelete = useCallback(
    async id => {
      try {
        await api.delete(`/incomes/${id}`);

        const dataAfterDelete = data.filter(income => income.id !== id);
        setData(dataAfterDelete);

        toast.success('Investimento cancelado com sucesso!');
      } catch (err) {
        toast.error(
          'Não foi possível deletar o investimento. Verifique se a data não está no futuro e tente novamente.',
        );
      }
    },
    [data],
  );

  const handleUpdate = useCallback(
    async (event, { type, value, date }) => {
      event.preventDefault();
      try {
        if (incomeEdit) {
          const response = await api.put(`/incomes/${incomeEdit.id}`, {
            type,
            value: incomeUnformat(value),
            date: new Date(date).getTime(),
          });

          const updateIncome = {
            ...response.data,
            value: response.data.value.toString(),
          };

          const index = data.findIndex(income => income.id === incomeEdit.id);

          data[index] = updateIncome;

          data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

          setData([...data]);
          setIsModal(false);
        }

        toast.success('Investimento editado com sucesso!');
      } catch (err) {
        toast.error(
          'Não foi possível editar o investimento. Verifique se a data não está no futuro, tente novamente.',
        );
      }
    },
    [data, incomeEdit],
  );

  const handleEdit = useCallback(
    id => {
      const findIncome = data.find(income => income.id === id);
      setIncomeEdit(findIncome);
      setIsModal(true);
    },
    [data],
  );

  const handleCloseModal = useCallback(() => {
    setIsModal(false);
  }, []);

  useOnClickOutside(modalRef, () => isModal && setIsModal(false));

  return (
    <>
      <Header />
      <Container>
        <h1>Carteira de Investimentos</h1>

        <FormWrapper
          buttonDescription="Adicionar"
          onHandleSubmit={handleSubmit}
        />

        <div>
          <IncomeData
            type={fixIncome}
            title="Renda Fixa"
            onHandleDelete={handleDelete}
            onHandleEdit={handleEdit}
          />

          <IncomeData
            type={variableIncome}
            title="Renda Variável"
            onHandleDelete={handleDelete}
            onHandleEdit={handleEdit}
          />
        </div>

        <Chart fixIncome={fixIncome} variableIncome={variableIncome} />
      </Container>

      {isModal && (
        <Modal>
          <section ref={modalRef}>
            <button type="button" onClick={handleCloseModal}>
              <IoMdCloseCircle />
            </button>

            <h1>Atualizar Investimento</h1>
            <Form
              buttonDescription="Atualizar"
              onHandleSubmit={handleUpdate}
              incomeEdit={incomeEdit}
            />
          </section>
        </Modal>
      )}
    </>
  );
};

export default Dashboard;
