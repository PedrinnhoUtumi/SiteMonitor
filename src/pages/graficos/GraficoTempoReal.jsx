import { useEffect, useRef } from 'react';
import nv from 'nvd3';
import * as d3 from 'd3';
import 'nvd3/build/nv.d3.css'; // Certifique-se de incluir o CSS

export function GraficoTempoReal() {
  const chartRef = useRef(null); // Referência para o gráfico

  useEffect(() => {
    // Carregar os dados JSON (pode ser substituído por uma API ou arquivo)
    d3.json("linePlusBarData.json").then(function(data) {
      nv.addGraph(function() {
        var chart = nv.models.linePlusBarChart()
          .margin({top: 30, right: 60, bottom: 50, left: 70})
          .x(function(d, i) { return i }) // Definir o valor do eixo x
          .y(function(d, i) { return d[1] }); // Definir o valor do eixo y

        // Formatação dos eixos
        chart.xAxis.tickFormat(function(d) {
          var dx = data[0].values[d] && data[0].values[d][0] || 0;
          return d3.timeFormat('%x')(new Date(dx));
        });

        chart.y1Axis.tickFormat(d3.format(',f')); // Formatação do eixo y1
        chart.y2Axis.tickFormat(function(d) { return '$' + d3.format(',f')(d) }); // Formatação do eixo y2
        chart.bars.forceY([0]); // Garantir que os valores de barras não sejam negativos

        // Renderizando o gráfico dentro do container
        d3.select(chartRef.current)
          .datum(data)
          .transition()
          .duration(0)
          .call(chart);

        nv.utils.windowResize(chart.update); // Ajustar o gráfico no redimensionamento da janela

        return chart;
      });
    }).catch(error => {
      console.error("Erro ao carregar os dados:", error);
    });

    // Cleanup para evitar vazamento de memória
    return () => {
      nv.utils.cleanup();
    };
  }, []);

  return (
    <div className="grafico-container" ref={chartRef}>
      {/* O gráfico será renderizado aqui */}
    </div>
  );
}
