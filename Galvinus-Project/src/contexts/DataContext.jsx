// src/context/DataContext.js
import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

  const DataProvider = ({ children }) =>
     {
  const [salesOrders, setSalesOrders] = useState([]);
  const [productUpdates, setProductUpdates] = useState([]);
  const [stockSummary, setStockSummary] = useState({});
  const [upcomingShipments, setUpcomingShipments] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    // Mock data for demonstration
    setSalesOrders([
      { id: 1, orderId: 'SO123', status: 'Shipped' },
      { id: 2, orderId: 'SO124', status: 'Pending' },
    ]);

    setProductUpdates([
      { id: 1, product: 'Product A', price: 100, discount: '10% off' },
      { id: 2, product: 'Product B', price: 200, discount: '5% off' },
    ]);

    setStockSummary({ totalItems: 500, lowStockItems: 10 });

    setUpcomingShipments([
      { id: 1, shipmentId: 'SH123', expectedDate: '2023-10-25' },
      { id: 2, shipmentId: 'SH124', expectedDate: '2023-10-30' },
    ]);

    setPendingInvoices([
      { id: 1, invoiceId: 'INV123', amount: 1000, currency: 'USD' },
      { id: 2, invoiceId: 'INV124', amount: 2000, currency: 'EUR' },
    ]);

    setExchangeRates({ USD: 1, EUR: 0.85, GBP: 0.73 });
  }, []);

  return (
    <DataContext.Provider
      value={{
        salesOrders,
        productUpdates,
        stockSummary,
        upcomingShipments,
        pendingInvoices,
        exchangeRates,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider