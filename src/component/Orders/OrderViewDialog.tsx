import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";
import { deleteOrder, Order, updateOrderStatus } from "../../api/orderApi";

interface DeleteConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  order: Order;
  onStatusChange: () => void;
}

export default function OrderViewDialog({
  open,
  handleClose,
  order,
  onStatusChange,
}: DeleteConfirmationDialogProps) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  // const handleChangeStatus = async () => {
  //   const res = await axios.put(
  //     `${ORDER_API_BASE_URL}/api/v1/orders/${order._id}`,
  //     {
  //       status: !order.status,
  //     }
  //   );
  //   if (res.status === 200) {
  //     alert("Status Changed Successfully");
  //     onStatusChange();
  //   } else {
  //     alert("Status Change Failed");
  //     // onStatusChange();
  //   }
  // };

  const handleChangeStatus = async () => {
    const res = await updateOrderStatus(order._id, !order.status);
    if (res === 200) {
      alert("Status Changed Successfully");
      onStatusChange();
    } else {
      alert("Status Change Failed");
    }
  };

  // const handleDeleteOrder = async () => {
  //   const res = await axios.delete(
  //     `${ORDER_API_BASE_URL}/api/v1/orders/${order._id}`
  //   );
  //   if (res.status === 200) {
  //     alert("Order Deleted Successfully");
  //     handleClose();
  //     onStatusChange();
  //   } else {
  //     alert("Order Deletion Failed");
  //   }
  // };

  const handleDeleteOrder = async () => {
    const res = await deleteOrder(order._id);
    if (res === 200) {
      alert("Order Deleted Successfully");
      handleClose();
      onStatusChange();
    } else {
      alert("Order Deletion Failed");
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="order-view-area"
        fullWidth
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "20px",
            paddingLeft: "10px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <DialogTitle variant="h6">Order Details</DialogTitle>
          <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
        </div>

        <DialogContent>
          <h3>Customer Details</h3>
          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <hr />
          <h3>Products</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderSpacing: 0,
              textAlign: "left",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <thead
              style={{
                backgroundColor: "#f2f2f2",
                color: "#333",
              }}
            >
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <h3>Payment Details</h3>
          <p>
            <strong>Transaction ID:</strong> {order.paymentData.transactionId}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentData.method}
          </p>{" "}
          <hr />
          <h3>Order Details</h3>
          <p>
            <strong>Order Date:</strong> {new Date(order.date).toDateString()}
          </p>
          <p>
            <strong>Total Cost:</strong> {`$${order.cost}`}
          </p>
          <p>
            <strong>Status:</strong> {order.status ? "✅" : "🏁"}
          </p>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
              paddingLeft: "10px",
              borderTop: "1px solid #ddd",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleChangeStatus}
              variant="contained"
              sx={{
                backgroundColor: order.status ? "blue" : "green",
                color: "white",
                "&:hover": {
                  backgroundColor: order.status ? "darkblue" : "darkgreen",
                },
              }}
            >
              Mark as {order.status ? "Pending" : "Completed"}
            </Button>
            <Button
              onClick={() => setOpenDeleteDialog(true)}
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
            >
              Delete Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>{" "}
      {openDeleteDialog && (
        <DeleteConfirmationDialog
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          itemName={order._id}
          onConfirm={handleDeleteOrder}
        />
      )}
    </React.Fragment>
  );
}
