'use client';
import SidebarLayout from '@/app/components/SidebarLayout';
import { useEffect, useState } from 'react';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any>([]);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  fetch('http://localhost:3001/orders', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(setOrders)
    .catch(error => {
      console.error('Failed to fetch orders:', error);
    });
}, []);

  return (
    <SidebarLayout>
      <h1 className="text-xl mb-4">Order History</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      <ul className="space-y-2">
        {orders.map((order : any) => (
          <li key={order.order_id} className="border p-2 rounded">
            <strong>Order ID:</strong> {order.order_id}<br />
            <strong>Amount:</strong> ${order.amount}<br />
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </SidebarLayout>
  );
}
