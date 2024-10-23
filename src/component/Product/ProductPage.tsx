import React from "react";
import ProductTable from "./ProductTable";
import { Button, Stack } from "@mui/material";

function ProductPage() {
  return (
    <>
      <Stack spacing={2} direction="row" justifyContent={"space-between"}>
        <h1>Product Page</h1>
        <div>
          <Button variant="contained" color="primary">
            + Add Product
          </Button>
        </div>
      </Stack>
      <ProductTable />
    </>
  );
}

export default ProductPage;
