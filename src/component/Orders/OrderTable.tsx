import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface paymentData {
  transactionId: string;
  paymentMethod: string;
}

interface Order {
  _id: number;
  date: string;
  cost: number;
  customer: Customer;
  products: Product[];
  paymentData: paymentData;
  status: boolean;
}

export default function OrderTable() {
  const [orderData, setOrderData] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("http://localhost:3000/api/v1/orders");
    const data = await response.json();
    setOrderData(data);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Orders Table
      </Typography>
      <div
        style={{
          maxHeight: "500px",
          overflowY: "scroll",
          width: "100%",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Order Id</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Cost</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((order) => (
                <StyledTableRow key={order._id}>
                  <StyledTableCell align="left">{order._id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {new Date(order.date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="left">{order.cost}</StyledTableCell>
                  <StyledTableCell align="left">
                    {order.status ? (
                      <Chip label="Completed" color="primary" />
                    ) : (
                      <Chip label="Pending" color="secondary" />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </div>
    </>
  );
}
