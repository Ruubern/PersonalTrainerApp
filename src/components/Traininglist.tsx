import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { getTrainings, deleteTraining } from "../trainingApi";
import type { Training } from "../types";
import dayjs from "dayjs";
import Button from "@mui/material/Button";

// Separate component for fetching & displaying customer
function CustomerCell({ url }: { url: string }) {
    const [customerName, setCustomerName] = useState("Loading...");

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCustomerName(`${data.firstname} ${data.lastname}`);
            })
            .catch(() => setCustomerName("Unknown"));
    }, [url]);

    return <span>{customerName}</span>;
}

function Traininglist() {

    const [trainings, setTrainings] = useState<Training[]>([]);

    const fetchTrainings = () => {
        getTrainings()
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleDelete = (trainingUrl: string) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            deleteTraining(trainingUrl)
                .then(() => fetchTrainings())
                .catch(err => console.error(err));
        }
    };

    const columns: GridColDef[] = [
        {
            field: "date",
            renderCell: (params: GridRenderCellParams<Training>) =>
                dayjs(params.value).format("DD.MM.YYYY HH:mm"),
        },
        { field: "duration" },
        { field: "activity" },
        {
            field: "customer",
            headerName: "Customer",
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<Training>) => (
                <CustomerCell url={params.row._links.customer.href} />
            ),
        },
        {   //button field for edit
            headerName: "",
            sortable: false,
            filterable: false,
            field: "edit",
        },
        {   //button field for delete
            headerName: "",
            sortable: false,
            filterable: false,
            field: "_links.self.href",
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    color="error"
                    onClick={() => handleDelete(params.id as string)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div style={{ width: "100%", height: 500, margin: "auto" }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row._links.self.href}
                autoPageSize
                rowSelection={false}
            />
        </div>
    );
}

export default Traininglist;
