import React from 'react';
import Form from '../Form';

import { Container } from './styles';

interface IData {
  value: string;
  date: string;
  type: string;
}

interface IFormProps {
  buttonDescription: string;
  onHandleSubmit(event: React.FormEvent<HTMLFormElement>, data: IData): void;
  IncomeEdit?: IData;
}

const FormWrapper: React.FC<IFormProps> = ({ ...rest }) => {
  return (
    <Container>
      <Form {...rest} />
    </Container>
  );
};

export default FormWrapper;
