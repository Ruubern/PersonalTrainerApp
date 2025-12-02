import { useEffect, useState } from "react";
import type { Customer } from "../types";
import { DataGrid, } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { getCustomers } from "../customerApi";
import { Add } from "@mui/icons-material";
import AddCustomer from "./AddCustomer";


function Customerlist() {
    
    const fetchCustomers = () => {
        getCustomers()
                .then(data => setCustomers(data._embedded.customers))
                .catch(err => console.error(err))
    }

    const [customers, setCustomers] = useState<Customer[]>([])
    useEffect(() => {
        fetchCustomers();
    }, [])


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
            <AddCustomer fetchCustomers={fetchCustomers} />
            <div style = {{ width: 800, height: 500, margin: "auto" }}>
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

export default Customerlist;