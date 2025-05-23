"use client";
import { useState } from "react";
import SidebarLayout from "@/app/components/SidebarLayout";

const products = [
  {
    id: "p1",
    name: "Compact Car Tyre",
    price: 25,
    image:
      "https://img.freepik.com/free-vector/realistic-complete-set-car-wheels_1284-29765.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: "p2",
    name: "Touring Tyre",
    price: 80,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWTIEwhoXZjDIv_lAf5WwS1n1Evx0cSLXuWQ&s",
  },
  {
    id: "p3",
    name: "Eco-Friendly Tyre",
    price: 40,
    image:
      "https://img.freepik.com/free-vector/realistic-complete-set-car-wheels_1284-29765.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: "p4",
    name: "All-Terrain Tyre",
    price: 120,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsj2yey8dnl75j39KAU-GsKKJpVhnq9NeJfQ&s",
  },
  {
    id: "p5",
    name: "Performance Radial Tyre",
    price: 150,
    image:
      "https://www.reisemoto.com/cdn/shop/files/Reise_TrailR_Tyre__1.png?v=1737455799",
  },
  {
    id: "p6",
    name: "Off-Road Tyre 4x4",
    price: 135,
    image:
      "https://www.shutterstock.com/image-photo/tire-repairing-service-garage-background-600nw-2437231237.jpg",
  },
];

export default function CreateOrderPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [message, setMessage] = useState("");

  const placeOrder = async () => {
    const user_id = localStorage.getItem("token");
    if (!user_id || !selectedProduct) return;

    const response = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", 
        "Authorization": `Bearer ${user_id}`        

       },
      body: JSON.stringify({
        amount: selectedProduct.price,
      }),
    });

    if (response.ok) {
      setMessage(`Order placed for ${selectedProduct.name}`);
    } else {
      setMessage("Failed to place order");
    }
  };

  return (
    <SidebarLayout>
      <h1 className="text-xl mb-6">Create Order</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className={`p-4 border rounded-lg cursor-pointer shadow hover:shadow-md bg-white relative transition ${
              selectedProduct.id === product.id ? "ring-2 ring-blue-400" : ""
            }`}
          >
            {/* <div className="absolute top-2 right-2">
              <Heart className="w-5 h-5 text-gray-400" />
            </div> */}
            <div className="h-32 flex items-center justify-center mb-4 text-gray-500">
              <img
                src={product.image}
                alt={product.name}
                className="h-32 w-full object-contain mb-4"
              />
            </div>
            <div className="font-semibold text-gray-800">{product.name}</div>
            <div className="text-gray-600">${product.price}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={placeOrder}
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </SidebarLayout>
  );
}
