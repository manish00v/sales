import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { TipsContext } from "../../../contexts/TipsContext";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { setTips } = useContext(TipsContext);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  return (
    <>
      <aside className="sidebar">
        <h1>Sales and Distribution</h1>

        <ul>
          <li>
            <Link to="/home">
              <i className="fas fa-home"></i>
              Home
            </Link>
          </li>

          {/* Sales and Distribution */}
          <li>
            <button onClick={() => toggleMenu("sales&distribution")}>
              <i className="fa-solid fa-truck-ramp-box"></i>
              Sales and Distribution
            </button>

            <ul
              className={`submenu ${
                activeMenu === "sales&distribution" ? "active" : ""
              }`}
            >
              {/* Sales Management */}
              <li>
                <button onClick={() => toggleSubmenu("salesManagement")}>
                  <i className="fa-solid fa-chart-line"></i>
                  Sales Management
                </button>

                {/* Submenu of Sales Management */}
                <ul
                  className={`subsubmenu ${
                    activeSubmenu === "salesManagement" ? "active" : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/salesorder"
                      onClick={() =>
                        setTips(
                          '"Review existing sales orders to avoid duplication before creating a new one."'
                        )
                      }
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      Sales Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/lineitems"
                      onClick={() =>
                        setTips(
                          '"Ensure each line item includes essential details like product, quantity price, discounts, and taxes."'
                        )
                      }
                    >
                      <i className="fas fa-tag icon-pricing"></i>
                      Line Items
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer"
                      onClick={() =>
                        setTips(
                          '"Accurate and up-to-date customer information is the foundation of strong relationships and streamlined operations."'
                        )
                      }
                    >
                      <i className="fa-solid fa-user"></i>
                      Customer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/salesperson"
                      onClick={() =>
                        setTips(
                          '"Accurate and accessible data boosts productivity, enhances client relationships, and drives sales success."'
                        )
                      }
                    >
                      <i className="fa-solid fa-user-tie"></i>
                      Sales Person
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Pricing and Discount */}
              <li>
                <button onClick={() => toggleSubmenu("pricing&discount")}>
                  <i className="fa-solid fa-dollar-sign"></i>
                  Pricing and Discount
                </button>

                {/* Submenu of Pricing and Discount */}
                <ul
                  className={`subsubmenu ${
                    activeSubmenu === "pricing&discount" ? "active" : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/pricingrules"
                      onClick={() =>
                        setTips(
                          '"Effective pricing rules turn complexity into clarity."'
                        )
                      }
                    >
                      <i className="fa-solid fa-money-check"></i>
                      Pricing Rules
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/discountrules"
                      onClick={() =>
                        setTips(
                          '"Intelligent discount rules drive sustainable sales, not fleeting gains."'
                        )
                      }
                    >
                      <i className="fa-solid fa-receipt"></i>
                      Discount Rules
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/product"
                      onClick={() =>
                        setTips(
                          '"The heart of any ERP system lies in how it handles your product story."'
                        )
                      }
                    >
                      <i className="fa-solid fa-box"></i>
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/discount"
                      onClick={() =>
                        setTips(
                          '"A well-placed discount can inspire loyalty; an ill-planned one can erode value."'
                        )
                      }
                    >
                      <i className="fa-solid fa-percent"></i>
                      Discount
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Inventory Management */}
              <li>
                <button onClick={() => toggleSubmenu("inventoryManagement")}>
                  <i className="fas fa-warehouse icon-inventory"></i>
                  Inventory Management
                </button>

                {/* Submenu of Inventory Management */}
                <ul
                  className={`subsubmenu ${
                    activeSubmenu === "inventoryManagement" ? "active" : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/inventory"
                      onClick={() =>
                        setTips(
                          '"Regularly update stock levels and leverage real-time tracking to reduce carrying costs and avoid stockouts."'
                        )
                      }
                    >
                      <i className="fas fa-user icon-sales"></i>
                      Inventory
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/warehouse"
                      onClick={() =>
                        setTips(
                          '"Use optimized layouts and automated processes to maximize space and speed up operations."'
                        )
                      }
                    >
                      <i className="fas fa-tag icon-pricing"></i>
                      Warehouse
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/productmovement"
                      onClick={() =>
                        setTips(
                          '"Track every movement with precision to ensure seamless delivery and reduce handling errors."'
                        )
                      }
                    >
                      <i className="fas fa-warehouse icon-inventory"></i>
                      Product Movement
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Logistics and Delivery */}
              <li>
                <button onClick={() => toggleSubmenu("logistics&delivery")}>
                  <i className="fas fa-truck icon-logistics"></i>
                  Logistics and Delivery
                </button>

                {/* Submenu of Logistics and Delivery */}
                <ul
                  className={`subsubmenu ${
                    activeSubmenu === "logistics&delivery" ? "active" : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/shipment"
                      onClick={() =>
                        setTips(
                          '"Ensure every shipment is accounted for with real-time visibility to reduce errors and delays."'
                        )
                      }
                    >
                      <i className="fas fa-user icon-sales"></i>
                      Shipment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/deliveryroute"
                      onClick={() =>
                        setTips(
                          '"Leverage route optimization to save time, reduce fuel costs, and improve delivery efficiency."'
                        )
                      }
                    >
                      <i className="fas fa-tag icon-pricing"></i>
                      Delivery Route
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/carrier"
                      onClick={() =>
                        setTips(
                          '"Partner with carriers that prioritize timely and secure deliveries to boost custormer satisfaction."'
                        )
                      }
                    >
                      <i className="fas fa-warehouse icon-inventory"></i>
                      Carrier
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/deliveryvehicle"
                      onClick={() =>
                        setTips(
                          '"Maintain a fleet tailored to your delivery needs, emphasizing fuel efficiency and capacity utilization."'
                        )
                      }
                    >
                      <i className="fas fa-file-invoice-dollar icon-billing"></i>
                      Delivery Vehicle
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Billing and Invoicing */}
              <li>
                <button onClick={() => toggleSubmenu("billing&invoicing")}>
                  <i className="fa-solid fa-file-invoice"></i>
                  Billing and Invoicing
                </button>

                {/* Submenu of Billing Invoicing */}
                <ul
                  className={`subsubmenu ${
                    activeSubmenu === "billing&invoicing" ? "active" : ""
                  }`}
                >
                  <li>
                    <Link
                      to="/invoice"
                      onClick={() =>
                        setTips(
                          '"Accuracy in invoicing builds trust and accelearates cash flow."'
                        )
                      }
                    >
                      <i className="fas fa-user icon-sales"></i>
                      Invoice
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/payment"
                      onClick={() =>
                        setTips(
                          '"Timely payments are the foundation of strong financial relationships."'
                        )
                      }
                    >
                      <i className="fas fa-tag icon-pricing"></i>
                      Payment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/taxconfiguration"
                      onClick={() =>
                        setTips(
                          '"Well-configured taxes ensure compliance without complexity."'
                        )
                      }
                    >
                      <i className="fas fa-warehouse icon-inventory"></i>
                      Tax Configuration
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/currencyexchangerate"
                      onClick={() =>
                        setTips(
                          '"Keep pace with exchange rates to stay ahead in the global market"'
                        )
                      }
                    >
                      <i className="fas fa-file-invoice-dollar icon-billing"></i>
                      Currency Exchange Rate
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Return */}

              <li>
                <button onClick={() => toggleSubmenu("returns")}>
                  <i className="fas fa-undo-alt return-icon"></i>
                  Returns
                </button>
              </li>

              {/* Submenu of Returns */}
              <ul
                className={`subsubmenu ${
                  activeSubmenu === "returns" ? "active" : ""
                }`}
              >
                <li>
                  <Link
                    to="/returnorder"
                    onClick={() =>
                      setTips('"Easy return, happy customer, repeat business."')
                    }
                  >
                    <i className="fas fa-undo-alt icon-sales"></i>
                    Return Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returnlineitems"
                    onClick={() =>
                      setTips(
                        '"Average return rate helps in tracking of overall Sales and Product quality."'
                      )
                    }
                  >
                    <i className="fas fa-box icon-pricing"></i>
                    Return Line Items
                  </Link>
                </li>
              </ul>
            </ul>
          </li>

          <li>
            <Link to="/">
              <i className="fas fa-link"></i>
              Integration
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fas fa-chart-pie"></i>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fas fa-file-alt"></i>
              Document
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
