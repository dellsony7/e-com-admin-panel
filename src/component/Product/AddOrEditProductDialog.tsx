import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Product } from "./ProductPage";

interface AddOrEditProductDialogProps {
  open: boolean;
  handleClose: () => void;
  isEditing?: boolean;
  selectedProduct?: Product | null;
}

export default function AddOrEditProductDialog({
  open,
  handleClose,
  isEditing,
  selectedProduct,
}: AddOrEditProductDialogProps) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle variant="h4">
          {isEditing ? "Update Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedProduct?.name}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={selectedProduct?.description}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={selectedProduct?.price}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={selectedProduct?.quantity}
          />
        </DialogContent>
        <DialogActions
          sx={{
            mb: 2,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log("Add Product");
            }}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
