import axios from "axios";
import { ORDER_API_BASE_URL } from "../config";

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Product {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface paymentData {
  transactionId: string;
  method: string;
}

export interface Order {
  _id: number;
  date: string;
  cost: number;
  customer: Customer;
  products: Product[];
  paymentData: paymentData;
  status: boolean;
}

export async function getOrderList(): Promise<Order[]> {
  const response = await axios.get(`${ORDER_API_BASE_URL}/api/v1/orders`);
  return response.data;
}

export async function updateOrderStatus(
  orderId: number,
  status: boolean
): Promise<number> {
  const res = await axios.put(
    `${ORDER_API_BASE_URL}/api/v1/orders/${orderId}`,
    {
      status: status,
    }
  );
  return res.status;
}

export async function deleteOrder(orderId: number): Promise<number> {
  const res = await axios.delete(
    `${ORDER_API_BASE_URL}/api/v1/orders/${orderId}`
  );
  return res.status;
}
