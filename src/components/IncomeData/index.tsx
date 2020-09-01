import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { RiEdit2Fill, RiDeleteBin5Fill } from 'react-icons/ri';
import { Container } from './styles';

interface IFormattedIncomeData {
  id: string;
  formattedCurrency: string;
  formattedDate: string;
}

interface IIncomeProps {
  title: string;
  type?: IFormattedIncomeData[];
  onHandleDelete(id: string): void;
  onHandleEdit(id: string): void;
}

const IncomeData: React.FC<IIncomeProps> = ({
  title,
  type,
  onHandleDelete,
  onHandleEdit,
}) => {

  console.log(type)

  return (
    <Container color={title}>
      <header>
        <h2>{title}</h2>
      </header>
      <section data-testid={`incomeData-${title}`}>
        {type?.length !== 0
          ? type?.map(income => (
              <div key={income.id}>
                <nav>
                  <FaArrowAltCircleRight />
                  <p>[{income.formattedDate}]</p>
                  <strong>{income.formattedCurrency}</strong>
                </nav>
                <div>
                  <button type="button" data-testid={`editButton-${title}`} onClick={() => onHandleEdit(income.id)}>
                    <RiEdit2Fill />
                  </button>

                  <button type="button" data-testid={`deleteButton-${title}`} onClick={() => onHandleDelete(income.id)}>
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
          ))
          : (
            <div>
              <nav>
                <p>Adicione o seu primeiro investimento</p>
              </nav>
            </div>
          )
        }
      </section>
    </Container>
  );
};

export default IncomeData;
