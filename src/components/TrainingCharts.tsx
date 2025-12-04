import { useState, useEffect } from "react";
import { getTrainingSessions } from "../trainingApi";
import type { ChartData, Training } from "../types";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import { BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";


export default function TrainingCharts() {

    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        
        getTrainingSessions()
            .then((trainings: Training[]) => {
                const groupedData = groupBy(trainings, "activity");

                const totalDuration = Object.entries(groupedData).map(([activityName, trainingsForActivity]) => ({
                activity: activityName,
                totalDuration: sumBy(trainingsForActivity, "duration"),
            }));
            setData(totalDuration);
            })
            .catch(err => console.error(err));
    },[]);


    return (
    <div>
        <h2>Training Statistics</h2>
      <BarChart data={data} width={1500} height={500}>
        <XAxis dataKey="activity" />
        <YAxis 
            label={{ 
                value: 'Total Duration (minutes)', 
                angle: -90, 
                position: 'insideLeft'
                }}
        />
        <Tooltip />
        <Bar dataKey="totalDuration" fill="#1976d2" />
      </BarChart>

    </div>
    );
}