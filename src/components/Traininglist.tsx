import { useEffect, useState } from "react";
import { DataGrid, } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getTrainings } from "../trainingApi";
import type { Training } from "../types";
import dayjs from "dayjs";

function Traininglist() {
    
    const fetchTrainings = () => {
        getTrainings()
                .then(data => setTrainings(data._embedded.trainings))
                .catch(err => console.error(err))
    }

    const [trainings, setTrainings] = useState<Training[]>([])
    useEffect(() => {
        fetchTrainings();
    }, [])

    

    const columns: GridColDef[] = [
        { field: "date",
        renderCell: (params: GridRenderCellParams<Training>) => {
        return dayjs(params.value).format("DD.MM.YYYY HH:mm")
        }},
        { field: "duration"},
        { field: "activity"},
        {//Button field for edit
            headerName: "",
            sortable: false,
            filterable:false,
            field: "edit",
            //rendercell tähän
        },{//Button field for delete
            headerName: "",
            sortable: false,
            filterable:false,
            field: "delete",
            //rendercell tähän
        }
        
    ]

    return (
        <>
            <div style = {{ width: "100%", height: 500, margin: "auto" }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                    />
            </div>
        </>
    )

}

export default Traininglist;