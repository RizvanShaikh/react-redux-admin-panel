import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DashboardHeader from "../../Navbar/dashboardHeader";
import Sidebar from "../../Navbar/sidebar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/usersSlice";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const usersList = useSelector((state) => state.users?.userMaster);

  console.log("usersList in List", usersList);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              onDeleteUser(params.row.id);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const onDeleteUser = (id) => {
    dispatch(deleteUser({ id }));
    setOpen(true);
  };

  return (
    <>
      <DashboardHeader />

      <Sidebar />
      <div
        style={{ height: 400, width: "80%", float: "right", marginTop: "100" }}
      >
        {/* Snake Bar Starts */}
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            User deleted successfully
          </Alert>
        </Snackbar>
        {/* Snake Bar Ends */}
        <Button
          // style={{float: "right" }}
          variant="contained"
          onClick={() => {
            navigate("/addUser");
          }}
        >
          Add User
        </Button>

        <DataGrid
          rows={usersList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

export default UserList;
