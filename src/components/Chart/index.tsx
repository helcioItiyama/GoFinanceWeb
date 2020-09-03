import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Container } from './styles';

interface IFormattedIncomeData {
  value: string;
}

interface IChartProps {
  fixIncome: IFormattedIncomeData[];
  variableIncome: IFormattedIncomeData[];
}

const Chart: React.FC<IChartProps> = ({ fixIncome, variableIncome }) => {
  const [chartData, setChartData] = useState({});
  const [fixIncomePercentage, setFixIncomePercentage] = useState(0);
  const [variableIncomePercentage, setVariableIncomePercentage] = useState(0);

  useEffect(() => {
    const totalFixIncomeAmount = fixIncome.reduce(
      (total: number, income): number => {
        return total + Number(income.value);
      },
      0,
    );

    const totalVariableIncomeAmount = variableIncome.reduce(
      (total: number, income): number => {
        return total + Number(income.value);
      },
      0,
    );

    const totalWalletAmount = totalFixIncomeAmount + totalVariableIncomeAmount;

    const fixValuePercentage = parseFloat(
      ((totalFixIncomeAmount / totalWalletAmount) * 100).toFixed(1),
    ) || 0;

    const variableValuePercentage = parseFloat(
      ((totalVariableIncomeAmount / totalWalletAmount) * 100).toFixed(1),
    ) || 0;

    setFixIncomePercentage(fixValuePercentage);
    setVariableIncomePercentage(variableValuePercentage);
  }, [fixIncome, variableIncome]);

  useEffect(() => {
    function chart() {
      setChartData({
        labels: [
          `${fixIncomePercentage}% da carteria em Renda - Fixa`,
          `${variableIncomePercentage}% da carteira em Renda - Variável`,
        ],
        datasets: [
          {
            data: [fixIncomePercentage, variableIncomePercentage],
            backgroundColor: ['#29388f', '#67178a'],
            borderWidth: 0,
          },
        ],
      });
    }
    chart();
  }, [fixIncomePercentage, variableIncomePercentage]);

  return (
    <Container>
      <h2>Resumo da Carteira</h2>

      <div>
        <Doughnut
          data={chartData}
          options={{
            legend: {
              labels: {
                fontColor: '#ffffff',
              },
            },
            tooltips: {
              callbacks: {
                label(
                  tooltipItem: {
                    index: React.ReactText;
                  },
                  data: {
                    labels: { [x: string]: string };
                  },
                ) {
                  const label = data.labels[tooltipItem.index];
                  return ` ${label}`;
                },
              },
            },
          }}
        />
      </div>
    </Container>
  );
};

export default Chart;
