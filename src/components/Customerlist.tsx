import { useEffect, useState } from "react";
import type { Customer } from "../types";
import { DataGrid, } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { getCustomers } from "../customerApi";
import { Add, Edit } from "@mui/icons-material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { deleteCustomer } from "../customerApi";
import AddTrainingsession from "./AddTrainingsession";
import { getTrainings } from "../trainingApi";


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

    const handleDelete = (customerUrl: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(customerUrl)
                .then(() => fetchCustomers())
                .catch(err => console.error(err));
        }
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
            field: "_links.customer.href",
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer fetchCustomers={fetchCustomers} customerRow={params.row} />
            
        },{//Button field for delete
            headerName: "",
            sortable: false,
            filterable:false,
            field: "_links.self.href",
            renderCell: (params: GridRenderCellParams) =>
                <Button color ="error" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        },{//Button field for adding a training session
            headerName: "",
            sortable: false,
            filterable:false,
            field: "addTraining",
            renderCell: (params: GridRenderCellParams) => (
                <AddTrainingsession 
                    fetchTrainings={getTrainings}
                    customerLink={params.row._links.self.href} 
                    />
        )}];

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