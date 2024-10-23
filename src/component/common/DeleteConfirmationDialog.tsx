import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertTitle } from "@mui/material";
interface DeleteConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  itemName?: string;
}

export default function DeleteConfirmationDialog({
  open,
  handleClose,
  itemName,
}: DeleteConfirmationDialogProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant="h6">
          {"Are You Sure You Want to Delete?"}
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            This action cannot be undone. Are you sure you want to delete this
            item <strong>{itemName}</strong>?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="inherit">
            Cancel{" "}
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Delete{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
