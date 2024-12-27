import React from "react";
import ProductTable from "./ProductTable";
import { Button, Stack } from "@mui/material";
import AddOrEditProductDialog from "./AddOrEditProductDialog";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

function ProductPage() {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };
  return (
    <>
      <Stack spacing={2} direction="row" justifyContent={"space-between"}>
        <h1>Product Page</h1>
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            + Add Product
          </Button>
        </div>
      </Stack>
      <ProductTable
        onRowClick={(product: Product) => {
          setSelectedProduct(product);
          setIsEditing(true);
          setOpen(true);
        }}
      />
      <AddOrEditProductDialog
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        selectedProduct={selectedProduct}
      />
    </>
  );
}

export default ProductPage;
