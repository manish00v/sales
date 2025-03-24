import { useState } from "react";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    productId: "",
    stockStatus: "",
    description: "",
    unitOfMeasurement: "",
    weightVolume: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if productId already exists
    try {
      const checkResponse = await fetch(`http://localhost:3001/api/products/${formData.productId}`);
      if (checkResponse.ok) {
        alert(`Product ID ${formData.productId} already exists. Please add a new ID.`);
        return; // Stop the form submission if productId exists
      }
    } catch (error) {
      console.error("Error checking product ID:", error);
      alert("Error checking product ID. Please try again.");
      return;
    }

    const formDataToSend = {
      ...formData,
      productId: formData.productId ? String(formData.productId) : null,
    };

    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      console.log("Product created successfully:", result);

      // Reset the form
      setFormData({
        productName: "",
        productId: "",
        category: "",
        stockStatus: "",
        description: "",
        unitOfMeasurement: "",
        weightVolume: ""
      });

      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Header Box  */}
          <div className="header-box">
            <h2>Header</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="productId">Product ID</label>
                <input
                  type="string"
                  id="productId"
                  name="productId"
                  placeholder="(Primary Key)"
                  value={formData.productId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Item Box */}
          <div className="item-box">
            <h2>Item</h2>

            <div className="data-container">
              <div className="data">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="unitOfMeasurement">Unit of Measurement</label>
                <input
                  type="text"
                  id="unitOfMeasurement"
                  name="unitOfMeasurement"
                  value={formData.unitOfMeasurement}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="weightVolume">Weight/Volume</label>
                <input
                  type="text"
                  id="weightVolume"
                  name="weightVolume"
                  value={formData.weightVolume}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="data">
                <label htmlFor="stockStatus">Stock Status</label>
                <input
                  type="text"
                  id="stockStatus"
                  name="stockStatus"
                  value={formData.stockStatus}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}