import { useEffect, useState } from "react";
import type { Customer } from "../types";
import { DataGrid, } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";


function Customerlist() {
    const [customers, setCustomers] = useState<Customer[]>([])
    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers() = () => {
        getCustomers()
                .then(data => setCustomers(data._embedded))
                .catch(err => console.error(err))
    }

    const columns: GridColDef[] = [
        { field: "firstname"},
        { field: "lastname"},
        { field: "streetaddress"},
        { field: "postcode"},
        { field: "city"},
        { field: "email"},
        { field: "phone"},
        {//Button field for edit
            headerName: "",
            sortable: false,
            filterable:false,
            field: "_links.self.href",
            //rendercell tähän
        },{//Button field for delete
            headerName: "",
            sortable: false,
            filterable:false,
            field: "_links.self.href",
            //rendercell tähän
        }
        
    ]

    return (
        <>
            <div style = {{ width: "90%", height: 500, margin: "auto" }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                    />
            </div>
        </>
    )

}

