import { Component, ViewChild } from "@angular/core";

import { Chart } from "chart.js";
import { CurrencyPipe, PercentPipe } from "@angular/common";

@Component({
  selector: "doughnut-chart",
  templateUrl: "doughnut-chart.html"
})
export class DoughnutChartComponent {
  @ViewChild("chartCanvas") chartCanvas;
  @ViewChild("chartLegend") chartLegend;
  chart: any;

  constructor() {}

  ngOnInit() {
    const currencyPipe = new CurrencyPipe("en_US");
    const percentPipe = new PercentPipe("en_US");

    const colors = {
      backgroundColor: [
        "rgba(26, 188, 156, 0.8)", // turquese
        "rgba(155, 89, 182, 0.8)", // violet
        "rgba(230, 126, 34, 0.8)", // orange
        "rgba(243, 114, 114, 0.8)", // red
        "rgba(149,165,166, 0.8)", // metal
        "rgba(52, 152, 219, 0.8)", // blue
        "rgba(46, 204, 113, 0.8)" // green
      ],
      hoverBackgroundColor: [
        "#1abc9c", // turquese
        "#9b59b6", // violet
        "#e67e22", // orange
        "#f37272", // red
        "#95a5a6", // metal
        "#3498db", // blue
        "#2ecc71" // green
      ]
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Alimentação", "Combustível", "Garagem", "Lazer", "Outros"],
        datasets: [
          {
            data: [12.34, 140, 30, 55, 20],
            backgroundColor: colors.backgroundColor,
            hoverBackgroundColor: colors.hoverBackgroundColor,
            borderColor: "#34495e",
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        legend: false,
        legendCallback: function(chart) {
          let legendHtml = [];
          let item = chart.data.datasets[0];

          legendHtml.push("<ul>");

          for (let i = 0; i < item.data.length; i++) {
            let value = currencyPipe.transform(item.data[i]);
            //let value = "$" + item.data[i];

            legendHtml.push("<li>");
            legendHtml.push(
              `<span class="chart-legend-bullet" style="color:${
                item.backgroundColor[i]
              }"></span>`
            );
            legendHtml.push(
              `<span class="chart-legend-label-text">${
                chart.data.labels[i]
              }</span>`
            );
            legendHtml.push(
              `<span class="chart-legend-label-value">${value}</span>`
            );
            legendHtml.push("</li>");
          }

          legendHtml.push("</ul>");

          return legendHtml.join("");
        },

        tooltips: {
          enabled: true,
          mode: "single",
          fontSize: 14,
          fontColor: "#3b3a3e",
          fontFamily: "Roboto",
          callbacks: {
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            },
            label: function(tooltipItem, data) {
              const amount = parseFloat(
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              );
              const total = parseFloat(
                eval(data.datasets[tooltipItem.datasetIndex].data.join("+"))
              );
              const percent = percentPipe.transform(amount / total);
              //const percent = amount / total;

              return percent;
            }
            // footer: function(tooltipItem, data) { return 'Total: 100 planos.'; }
          }
        }
      }
    });

    this.chartLegend.nativeElement.innerHTML = this.chart.generateLegend();
  }
}
