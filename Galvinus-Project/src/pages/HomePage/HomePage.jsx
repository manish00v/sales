// import module from "./HomePage.module.css";
// import { useContext, useEffect, useState } from "react";
// import { DataContext } from "../../contexts/DataContext";
// import { ProfileContext } from "../../contexts/ProfileContext";
// import { Clock } from "lucide-react"; // Correct import for the Clock icon
// import { useNavigate } from "react-router-dom";
// import fetchWithAuth from "../../utils/app";

// const Homepage = () => {
//   const {
//     salesOrders,
//     productUpdates,
//     stockSummary,
//     upcomingShipments,
//     pendingInvoices,
//     exchangeRates,
//   } = useContext(DataContext);
//   const navigate = useNavigate();
//   // Access the profile data from ProfileContext
//   const { profile } = useContext(ProfileContext);
//   const [name, setName] = useState("");
//   const token = localStorage.getItem("accessToken");

//   const fetchUser = async (e) => {
//     try {
//       const response = await fetchWithAuth("/api/auth/get-user", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       setName(data.name);
//       if (!response.ok) {
//         navigate("/signup");
//         throw new Error(data.error || "failed to fetch user");
//       }
//     } catch (err) {
//       console.error("Error while fetching user:", err);
//     }
//   };

//   // Get the current date and time
//   const currentTime = new Date();

//   useEffect(() => {
//     fetchUser();
//   }, [token]);

//   return (
//     <>
//       <div className={module.header}>
//         <div className={module.welcomeContainer}>
//           {/* Dynamically display the user's name from the profile */}
//           <div className={module.welcomeMessage}>Welcome back, {name}!</div>
//           <div className={module.pageDescription}>You are on the Home Page</div>
//         </div>

//         <div className={module.currentTime}>
//           <div className={module.currentTimeText}>
//             <p className={module.timeLabel}>Today's Date</p>
//             <p className={module.timeValue}>
//               {currentTime.toLocaleDateString("en-US", {
//                 weekday: "long",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//           <Clock className={module.currentTimeIcon} />
//         </div>
//       </div>

//       <div className={module.container}>
//         <div className={module.box}>
//           <h3>Recent Sales Orders</h3>
//           <ul>
//             {salesOrders.map((order) => (
//               <li key={order.id}>
//                 {order.orderId} - {order.status}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={module.box}>
//           <h3>Product Price Updates and Discounts</h3>
//           <ul>
//             {productUpdates.map((product) => (
//               <li key={product.id}>
//                 {product.product} - ${product.price} ({product.discount})
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={module.box}>
//           <h3>Stock Summary and Low Stock Alerts</h3>
//           <p>Total Items: {stockSummary.totalItems}</p>
//           <p>Low Stock Items: {stockSummary.lowStockItems}</p>
//         </div>

//         <div className={module.box}>
//           <h3>Upcoming Shipments</h3>
//           <ul>
//             {upcomingShipments.map((shipment) => (
//               <li key={shipment.id}>
//                 {shipment.shipmentId} - {shipment.expectedDate}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className={module.box}>
//           <h3>Pending Invoices and Exchange Rates</h3>
//           <ul>
//             {pendingInvoices.map((invoice) => (
//               <li key={invoice.id}>
//                 {invoice.invoiceId} - {invoice.amount} {invoice.currency} (
//                 {exchangeRates[invoice.currency]})
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Homepage;

import module from "./HomePage.module.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import {
  Clock,
  ShoppingCart,
  Tag,
  Package,
  Truck,
  Receipt,
  User,
  Home,
  AlertTriangle,
  Check,
  RefreshCw,
  Calendar,
  DollarSign,
  BarChart4,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../utils/app";

const Homepage = () => {
  const {
    salesOrders,
    productUpdates,
    stockSummary,
    upcomingShipments,
    pendingInvoices,
    exchangeRates,
  } = useContext(DataContext);
  const navigate = useNavigate();
  // Access the profile data from ProfileContext
  const { profile } = useContext(ProfileContext);
  const [name, setName] = useState("");
  const token = localStorage.getItem("accessToken");

  const fetchUser = async (e) => {
    try {
      const response = await fetchWithAuth("/api/auth/get-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setName(data.name);
      if (!response.ok) {
        navigate("/signup");
        throw new Error(data.error || "failed to fetch user");
      }
    } catch (err) {
      console.error("Error while fetching user:", err);
    }
  };

  // Get the current date and time
  const currentTime = new Date();

  // Helper function to get status badge class
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return module.completed;
      case "Pending":
        return module.pending;
      default:
        return module.processing;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <>
      <div className={module.header}>
        <div className={module.welcomeContainer}>
          <div className={module.welcomeMessage}>
            <User size={24} /> Welcome back, {name}!
          </div>
          <div className={module.pageDescription}>
            <Home size={16} style={{ marginRight: "8px", opacity: 0.7 }} />
            You are on the Home Page
          </div>
        </div>

        <div className={module.currentTime}>
          <div className={module.currentTimeText}>
            <p className={module.timeLabel}>Today's Date</p>
            <p className={module.timeValue}>
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Clock className={module.currentTimeIcon} />
        </div>
      </div>

      <div className={module.container}>
        <div className={module.box}>
          <h3>
            <ShoppingCart size={18} /> Recent Sales Orders
          </h3>
          {salesOrders.length > 0 ? (
            <ul>
              {salesOrders.map((order) => (
                <li key={order.id}>
                  <Calendar size={16} /> {order.orderId}
                  <span
                    className={`${module.statusBadge} ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={module.emptyState}>No recent orders to display</div>
          )}
          <button className={module.actionButton}>
            <ShoppingCart size={14} /> View All Orders
          </button>
        </div>

        <div className={module.box}>
          <h3>
            <Tag size={18} /> Product Price Updates
          </h3>
          {productUpdates.length > 0 ? (
            <ul>
              {productUpdates.map((product) => (
                <li key={product.id}>
                  <Package size={16} /> {product.product}
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span className={module.priceValue}>
                      <DollarSign size={14} />
                      {product.price}
                    </span>
                    <span className={module.discountBadge}>
                      {product.discount}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={module.emptyState}>No price updates available</div>
          )}
          <button className={module.actionButton}>
            <RefreshCw size={14} /> Refresh Updates
          </button>
        </div>

        <div className={module.box}>
          <h3>
            <Package size={18} /> Stock Summary
          </h3>
          <p>
            <span className={module.totalItems}>
              <BarChart4 size={16} style={{ marginRight: "6px" }} />
              Total Items: {stockSummary.totalItems}
            </span>
          </p>
          <p>
            <span className={module.lowStockAlert}>
              <AlertTriangle size={16} />
              Low Stock Items: {stockSummary.lowStockItems}
            </span>
          </p>
          <button className={module.actionButton}>
            <Package size={14} /> View Inventory
          </button>
        </div>

        <div className={module.box}>
          <h3>
            <Truck size={18} /> Upcoming Shipments
          </h3>
          {upcomingShipments.length > 0 ? (
            <ul>
              {upcomingShipments.map((shipment) => (
                <li key={shipment.id}>
                  <Truck size={16} /> {shipment.shipmentId}
                  <span style={{ marginLeft: "auto" }}>
                    <Calendar size={14} style={{ marginRight: "4px" }} />
                    {shipment.expectedDate}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className={module.emptyState}>No upcoming shipments</div>
          )}
          <button className={module.actionButton}>
            <Truck size={14} /> Track Shipments
          </button>
        </div>

        <div className={module.box}>
          <h3>
            <Receipt size={18} /> Pending Invoices
          </h3>
          {pendingInvoices.length > 0 ? (
            <ul>
              {pendingInvoices.map((invoice) => (
                <li key={invoice.id}>
                  <Receipt size={16} /> {invoice.invoiceId}
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{invoice.amount}</span>
                    <span className={module.currencyTag}>
                      {invoice.currency} ({exchangeRates[invoice.currency]})
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={module.emptyState}>No pending invoices</div>
          )}
          <button className={module.actionButton}>
            <DollarSign size={14} /> View Finances
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
