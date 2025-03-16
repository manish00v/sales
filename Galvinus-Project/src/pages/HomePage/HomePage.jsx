import module from "./HomePage.module.css";
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { ProfileContext } from '../../contexts/ProfileContext';
import { Clock } from 'lucide-react'; // Correct import for the Clock icon

const Homepage = () => {
  const {
    salesOrders,
    productUpdates,
    stockSummary,
    upcomingShipments,
    pendingInvoices,
    exchangeRates,
  } = useContext(DataContext);
  // Access the profile data from ProfileContext
  const { profile } = useContext(ProfileContext);

  // Get the current date and time
  const currentTime = new Date();

  return (
    <>
      <div className={module.header}>
        <div className={module.welcomeContainer}>
          {/* Dynamically display the user's name from the profile */}
          <div className={module.welcomeMessage}>Welcome back, {profile.userName}!</div>
          <div className={module.pageDescription}>You are on the Home Page</div>
        </div>

        <div className={module.currentTime}>
          <div className={module.currentTimeText}>
            <p className={module.timeLabel}>Today's Date</p>
            <p className={module.timeValue}>
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <Clock className={module.currentTimeIcon} />
        </div>
      </div>

      <div className={module.container}>
        <div className={module.box}>
          <h3>Recent Sales Orders</h3>
          <ul>
            {salesOrders.map((order) => (
              <li key={order.id}>
                {order.orderId} - {order.status}
              </li>
            ))}
          </ul>
        </div>

        <div className={module.box}>
          <h3>Product Price Updates and Discounts</h3>
          <ul>
            {productUpdates.map((product) => (
              <li key={product.id}>
                {product.product} - ${product.price} ({product.discount})
              </li>
            ))}
          </ul>
        </div>

        <div className={module.box}>
          <h3>Stock Summary and Low Stock Alerts</h3>
          <p>Total Items: {stockSummary.totalItems}</p>
          <p>Low Stock Items: {stockSummary.lowStockItems}</p>
        </div>

        <div className={module.box}>
          <h3>Upcoming Shipments</h3>
          <ul>
            {upcomingShipments.map((shipment) => (
              <li key={shipment.id}>
                {shipment.shipmentId} - {shipment.expectedDate}
              </li>
            ))}
          </ul>
        </div>

        <div className={module.box}>
          <h3>Pending Invoices and Exchange Rates</h3>
          <ul>
            {pendingInvoices.map((invoice) => (
              <li key={invoice.id}>
                {invoice.invoiceId} - {invoice.amount} {invoice.currency} (
                {exchangeRates[invoice.currency]})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Homepage;