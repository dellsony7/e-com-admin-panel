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
import OrderViewDialog from "./OrderViewDialog";
import { getOrderList, Order } from "../../api/orderApi";

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

export default function OrderTable() {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(
    undefined
  );
  const [orderViewDialogOpen, setOrderViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  // using fetch API to get orders data
  // const fetchOrders = async () => {
  //   const response = await fetch("http://localhost:3000/api/v1/orders");
  //   const data = await response.json();
  //   setOrderData(data);
  // };

  // using axios to get orders data
  // const fetchOrders = async () => {
  //   const response = await axios.get(`${ORDER_API_BASE_URL}/api/v1/orders`);
  //   setOrderData(response.data);
  // };

  // using the orderApi.ts to get orders data
  const fetchOrders = async () => {
    const orders = await getOrderList();
    setOrderData(orders);

    if (selectedOrder !== null) {
      const updatedOrder = orders.find(
        (order) => order._id === selectedOrder?._id
      );
      setSelectedOrder(updatedOrder);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Orders Table
      </Typography>
      {/* <div
        style={{
          maxHeight: "500px",
          overflowY: "scroll",
          width: "100%",
        }}
      > */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 550, overflowY: "auto" }}
      >
        <Table aria-label="customized table" stickyHeader>
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
              <StyledTableRow
                key={order._id}
                onClick={() => {
                  setOrderViewDialogOpen(true);
                  setSelectedOrder(order);
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  },
                }}
              >
                <StyledTableCell align="left">{order._id}</StyledTableCell>
                <StyledTableCell align="left">
                  {new Date(order.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="left">{`$${order.cost}`}</StyledTableCell>
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
      </TableContainer>
      {/* </div> */}
      {orderViewDialogOpen && selectedOrder && (
        <OrderViewDialog
          open={orderViewDialogOpen}
          handleClose={() => {
            setSelectedOrder(undefined);
            setOrderViewDialogOpen(false);
          }}
          order={selectedOrder}
          onStatusChange={fetchOrders}
        />
      )}
    </>
  );
}
