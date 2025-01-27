import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Checkbox,
  Paper,
  TableSortLabel,
  TablePagination,
  Tooltip,
  TextField,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { getRelativeTime } from "./helpers/time/getRelativeTime";
import { getComparator } from "./helpers/sorting/getComparator";
import { stableSort } from "./helpers/sorting/stableSort";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import Button from "../Button/Button";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";
import { ReactComponent as LockIcon } from "../../assets/images/lock_person.svg";
import { ReactComponent as UnlockIcon } from "../../assets/images/lock_open.svg";

export const UserManagementTable = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchWithAuth } = useFetchWithAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetchWithAuth(`${process.env.BACKEND_URL}:5000/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAction = async (action) => {
    try {
      const response = await fetchWithAuth(`${process.env.BACKEND_URL}:5000/api/users/${action}`, {
        method: action === "delete" ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: selectedUsers }),
      });

      if (response.ok) {
        fetchUsers();
        setSelectedUsers([]);
        alert(`The ${action} operation is successfully performed.`);
      } else {
        alert(`Failed to ${action} users`);
        console.error(`Failed to ${action} users`);
      }
    } catch (error) {
      console.error("Error updating users:", error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allUserIds = users
      .map((u) => u.id)
      .filter((id) => id !== currentUserId);;
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleRowSelection = (userId) => {
    if (userId === currentUserId) return;

    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const isSelected = (id) => selectedUsers.includes(id);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedUsers = stableSort(users, getComparator(order, orderBy));

  const query = searchTerm.toLowerCase();
  const filteredUsers = sortedUsers.filter((user) => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className="mb-[10vw] p-4 rounded shadow w-full max-[768px]:mb-[9vh]">
      <Toolbar className="flex justify-between bg-zinc-100">
        <Box className="flex items-center w-full gap-2">
          <TextField
            variant="outlined"
            size="small"
            label="Search"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="bg-white"
          />
          <Button onClick={() => handleAction("block")} text={<LockIcon className="w-1/2 h-1/2 m-auto" />}/>
          <Button onClick={() => handleAction("unblock")} text={<UnlockIcon className="w-1/2 h-1/2 m-auto" />}/>
          <Button onClick={() => handleAction("delete")} text={<DeleteIcon className="w-1/2 h-1/2 m-auto" />}/>
        </Box>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedUsers.length > 0 &&
                    selectedUsers.length <
                      filteredUsers.filter((u) => u.id !== currentUserId).length
                  }
                  checked={
                    filteredUsers.length > 0 &&
                    selectedUsers.length ===
                      filteredUsers.filter((u) => u.id !== currentUserId).length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell sortDirection={orderBy === "name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "name")}
                >
                  Name
                  {orderBy === "name" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "email" ? order : false}>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "email")}
                >
                  Email
                  {orderBy === "email" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "last_login" ? order : false}>
                <TableSortLabel
                  active={orderBy === "last_login"}
                  direction={orderBy === "last_login" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "last_login")}
                >
                  Last Login
                  {orderBy === "last_login" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "status" ? order : false}>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "status")}
                >
                  Status
                  {orderBy === "status" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc" ? "sorted descending" : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => {
              const selected = isSelected(user.id);
              const isCurrentUser = user.id === currentUserId;
              const displayNameStyle =
                user.status === "blocked"
                  ? { textDecoration: "line-through", opacity: 0.6 }
                  : {};
              return (
                <TableRow key={user.id} hover selected={selected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected}
                      onChange={() => handleRowSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <span style={displayNameStyle}>{user.name}</span>
                    {user.title && (
                      <div style={{ fontSize: "0.8rem", color: "gray" }}>
                        {user.title}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.last_login ? (
                      <Tooltip title={new Date(user.last_login).toLocaleString()} arrow>
                        <span>{getRelativeTime(user.last_login)}</span>
                      </Tooltip>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{user.status || "N/A"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
