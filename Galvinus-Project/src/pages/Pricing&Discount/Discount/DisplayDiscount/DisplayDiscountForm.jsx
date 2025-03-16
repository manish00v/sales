import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayDiscountForm() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const { discountId, productId } = useParams(); // Extract discountId and productId from the URL
    const [formData, setFormData] = useState({
        discountId: "",
        productId: "",
        discountCriteria: "",
        productDiscount: "",
        customerDiscount: "",
        discountValue: "",
        discountEligibilityCondition: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBtn("NoBtn");
        setGoBackUrl("/discount");

        const fetchDiscountDetails = async () => {
            try {
                // Validate discountId and productId
                if (!discountId || !productId) {
                    throw new Error("Discount ID and Product ID are required");
                }

                console.log("Fetching discount details with discountId:", discountId, "and productId:", productId); // Debugging
                const response = await fetch(`http://localhost:3000/api/discounts/${discountId}/${productId}`);
                if (!response.ok) {
                    throw new Error("Discount details not found");
                }
                const data = await response.json();
                console.log("Fetched discount details data:", data); // Debugging

                // Handle array response
                const discountDetails = Array.isArray(data) ? data[0] : data;
                console.log("Extracted discount details:", discountDetails); // Debugging

                // Check if the fetched discount details match the provided discountId and productId
                if (discountDetails.discountId !== parseInt(discountId) || discountDetails.productId !== parseInt(productId)) {
                    throw new Error("Discount ID and Product ID do not match");
                }

                // Populate the form data if the discount details are found
                setFormData({
                    discountId: discountDetails.discountId,
                    productId: discountDetails.productId,
                    discountCriteria: discountDetails.discountCriteria,
                    productDiscount: discountDetails.productDiscount,
                    customerDiscount: discountDetails.customerDiscount,
                    discountValue: discountDetails.discountValue,
                    discountEligibilityCondition: discountDetails.discountEligibilityCondition,
                });
            } catch (err) {
                console.error("Error fetching discount details:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountDetails();
    }, [discountId, productId, setBtn, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Discount</h2>

                    {/* Display error message if discount details are not found or do not match */}
                    {error && <div className="error-message">{error}</div>}

                    <form>
                        {/* Header Box */}
                        <div className="header-box">
                            <h2>Header</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="discountId">Discount ID</label>
                                    <input
                                        type="text"
                                        id="discountId"
                                        name="discountId"
                                        value={formData.discountId}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="productId">Product ID</label>
                                    <input
                                        type="text"
                                        id="productId"
                                        name="productId"
                                        value={formData.productId}
                                        
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Item Box */}
                        <div className="item-box">
                            <h2>Item</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="discountCriteria">Discount Criteria</label>
                                    <input
                                        type="text"
                                        id="discountCriteria"
                                        name="discountCriteria"
                                        value={formData.discountCriteria}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="productDiscount">Product Discount</label>
                                    <input
                                        type="text"
                                        id="productDiscount"
                                        name="productDiscount"
                                        value={formData.productDiscount}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="customerDiscount">Customer Discount</label>
                                    <input
                                        type="text"
                                        id="customerDiscount"
                                        name="customerDiscount"
                                        value={formData.customerDiscount}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="discountValue">Discount Value</label>
                                    <input
                                        type="text"
                                        id="discountValue"
                                        name="discountValue"
                                        value={formData.discountValue}
                                        
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="discountEligibilityCondition">Discount Eligibility Condition</label>
                                    <input
                                        type="text"
                                        id="discountEligibilityCondition"
                                        name="discountEligibilityCondition"
                                        value={formData.discountEligibilityCondition}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}