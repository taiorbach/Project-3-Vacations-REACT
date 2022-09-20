import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationsService";
import "./FollowersChart.css";
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import notify from "../../../Services/NotifyService";
import store from "../../../Redux/store";


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

function FollowersChart(): JSX.Element {


    const [vacationsFollowers , setVacationsFollowers] = useState<VacationModel[]>([])

    useEffect(() => {
        vacationService.getAllVacations()
        .then((vacations) => {
            vacations.sort(function (a,b){
                return b.numOfFollowers - a.numOfFollowers
            })
            setVacationsFollowers(
                vacations.filter((v) => v.numOfFollowers > 0)
            )
        })
        .catch(err => notify.error(err))

        const unsubscribeVacations = store.subscribe(() => {
            setVacationsFollowers(store.getState().vacationState.vacations)
        })
        return () => unsubscribeVacations()
        
    } , [])


    const labels = vacationsFollowers.map((v) => v.destination)

    const options = {
        resposive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: false,
                text: 'Vacations Followers - Chart.js'
            }
        }
    }

    const data = {
        labels: labels,
        datasets: [{
            label: "Followers Number",
            data: vacationsFollowers.map((v) => v.numOfFollowers),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
        }]
    }


    return (
        <div className="FollowersChart">
			{vacationsFollowers && <Bar options={options} data={data}></Bar>}
        </div>
    );
}

export default FollowersChart;
