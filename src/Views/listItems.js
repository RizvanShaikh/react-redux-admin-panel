import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export const mainListItems = (
  <React.Fragment>
    {/* <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton> */}
    {/* <Link to="/userList">User Master</Link> */}
    <ListItemButton>
      <Button
      // style={{float: "right" }}
      >
        <Link to="/userList">User Master</Link>
        {/* User Master */}
      </Button>
    </ListItemButton>
    {/* <ListItemButton to="/userList">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>

      <ListItemText primary="User Master" />
    </ListItemButton> */}
    {/* <ListItemButton to="/">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>

      <ListItemText primary="Sign Out" />
    </ListItemButton> */}
    <ListItemButton>
      <Button
      // style={{float: "right" }}
      >
        <Link to="/">Sign Out</Link>
      </Button>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
  </React.Fragment>
);
