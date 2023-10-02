import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import GBP from "@/helpers/gbp";

const ExpensesChart = ({ entries, categories, subCategories }) => {

    const chartRef = useRef(null)

    const [chartOptions, setChartOptions] = useState({
        plugins: {
            title: {
                display: true,
                text: "This Month's Expenses",
                color: "white",
                padding: 40,
                font: { size: 30 }
            },
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                display: true,
                color: "white",
                borderRadius: 3,
                backgroundColor: "#0008",
                textAlign: "center",
                formatter: function (value, context) {
                    return `${context.chart.data.labels[context.dataIndex] ? `${context.chart.data.labels[context.dataIndex]}\n` : ''}${GBP.format(value)}`
                }
            }
        },
        datasets: { pie: { hoverOffset: 15 } }
    })

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: "black",
            borderWidth: 2,
        },
        {
            data: [],
            backgroundColor: [],
            borderColor: "black",
            borderWidth: 2,
        }]
    })

    useEffect(() => {

        let categoryArray = [], subCategoryArray = []

        entries.forEach(entry => {
            if (entry.out) {

                if (!categoryArray.find(f => f.name == entry.category)) {
                    let category = categories.find(c => c.name == entry.category)
                    categoryArray.push({ name: entry.category, value: entry.value, color: category.color })
                }
                else categoryArray.find(f => f.name == entry.category).value += entry.value

                if (!subCategoryArray.find(f => f.name == entry.subCategory)) {
                    let x = categories.find(c => c.name == entry.category)
                    subCategoryArray.push({ name: entry.subCategory, category: entry.category, value: entry.value, color: x.color })
                }
                else subCategoryArray.find(f => f.name == entry.subCategory).value += entry.value
            }
        })

        categoryArray.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
        })

        subCategoryArray.sort((a, b) => {
            let fa = a.category.toLowerCase(),
                fb = b.category.toLowerCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
        })

        setChartData(old => {
            let newData = { ...old }
            newData.labels = categoryArray.map(a => a.name)
            newData.datasets[0].data = categoryArray.map(a => a.value) //update state
            chartRef.current.data.datasets[0].data = categoryArray.map(a => a.value) //update the actual chart
            newData.datasets[0].backgroundColor = categoryArray.map(a => a.color) //update state
            chartRef.current.data.datasets[0].backgroundColor = categoryArray.map(a => a.color) //update the actual chart

            newData.datasets[1].labels = subCategoryArray.map(a => a.name)
            chartRef.current.data.datasets[1].labels = subCategoryArray.map(a => a.name)
            newData.datasets[1].data = subCategoryArray.map(a => a.value) //update state
            chartRef.current.data.datasets[1].data = subCategoryArray.map(a => a.value) //update the actual chart
            newData.datasets[1].backgroundColor = categoryArray.map(a => a.color) //update state
            chartRef.current.data.datasets[1].backgroundColor = subCategoryArray.map(a => a.color) //update the actual chart

            newData.datasets[1].datalabels = {
                font: { size: 10 },
                formatter: function (value, context) {
                    return `${context.chart.data.datasets[1].labels[context.dataIndex] ? `${context.chart.data.datasets[1].labels[context.dataIndex]}\n` : ''}${GBP.format(value)}`
                }
            }

            return newData
        })
    }, [entries])

    return (
        <Pie ref={chartRef} data={chartData} plugins={[ChartDataLabels]} options={chartOptions} />

    )
}

export default ExpensesChart