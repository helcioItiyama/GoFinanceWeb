import React, { useState, useCallback, useMemo } from 'react';
import {
  incomeFormat,
  dayMonthYearFormat,
  yearMonthDayFormat,
} from '../../utils/format';

interface IData {
  value: string;
  date: string;
  type: string;
}

interface IFormProps {
  buttonDescription: string;
  onHandleSubmit(event: React.FormEvent<HTMLFormElement>, data: IData): void;
  incomeEdit?: IData;
}

const Form: React.FC<IFormProps> = ({
  buttonDescription,
  onHandleSubmit,
  incomeEdit,
}) => {
  const today = useMemo(() => {
    return dayMonthYearFormat(new Date().toString());
  }, []);

  const editDate = useMemo(() => {
    if (incomeEdit?.date) {
      return yearMonthDayFormat(incomeEdit.date);
    }
    return null;
  }, [incomeEdit]);

  const editValue = useMemo(() => {
    if (incomeEdit?.value) {
      return incomeEdit?.value.toString().replace('.', ',');
    }
    return null;
  }, [incomeEdit]);

  const [value, setValue] = useState(editValue || '');
  const [date, setDate] = useState(editDate || '');
  const [type, setType] = useState(incomeEdit?.type || 'Escolha uma opção');

  const handleIncome = useCallback(event => {
    const formattedInput = incomeFormat(event.target.value);
    setValue(formattedInput);
  }, []);

  const handleDate = useCallback(event => {
    setDate(event.target.value);
  }, []);

  const handleSelect = useCallback(event => {
    setType(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    event => {
      onHandleSubmit(event, { value, date, type });
      setValue('');
      setType('Escolha uma opção');
      setDate('');
    },
    [value, date, type, onHandleSubmit],
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">
        Adicionar novo investimento:
        <select
          name="type"
          id="type"
          data-testid="selectType"
          value={type}
          onChange={handleSelect}
          required
        >
          <option disabled hidden>
            Escolha uma opção
          </option>
          <option value="renda-fixa">Renda fixa</option>
          <option value="renda-variavel">Renda variável</option>
        </select>
      </label>

      <label htmlFor="income">
        R$
        <input
          id="income"
          data-testid="income"
          name="income"
          value={value}
          onChange={handleIncome}
        />
      </label>

      <label htmlFor="date">
        <input
          type="date"
          id="date"
          data-testid="date"
          name="date"
          value={date}
          onChange={handleDate}
        />
      </label>

      <button type="submit" data-testid={`submitButton-${buttonDescription}`}>{buttonDescription}</button>
    </form>
  );
};

export default Form;
