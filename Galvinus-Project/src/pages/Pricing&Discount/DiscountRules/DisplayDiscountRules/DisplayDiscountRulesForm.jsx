import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import "../../../../components/Layout/Styles/BoxFormStyles.css";

export default function DisplayDiscountRulesForm() {
    const { setBtn, setGoBackUrl } = useContext(FormPageHeaderContext);
    const { discountId, productId } = useParams(); // Extract discountId and productId from the URL
    const [formData, setFormData] = useState({
        discountId: "",
        productId: "",
        applicableTo: "",
        criteria: "",
        discountType: "",
        discountValue: "",
        effectiveDate: "",
        expiryDate: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setBtn("NoBtn");
        setGoBackUrl("/discountrules");

        const fetchDiscountRules = async () => {
            try {
                // Validate discountId and productId
                if (!discountId || !productId) {
                    throw new Error("Discount ID and Product ID are required");
                }

                console.log("Fetching discount rules with discountId:", discountId, "and productId:", productId); // Debugging
                const response = await fetch(`http://localhost:3001/api/discount-rules/${discountId}/${productId}`);
                if (!response.ok) {
                    throw new Error("Discount rules not found");
                }
                const data = await response.json();
                console.log("Fetched discount rules data:", data); // Debugging

                // Handle array response
                const discountRules = Array.isArray(data) ? data[0] : data;
                console.log("Extracted discount rules:", discountRules); // Debugging

                // Populate the form data if the discount rules are found
                setFormData({
                    discountId: discountRules.discountId,
                    productId: discountRules.productId,
                    applicableTo: discountRules.applicableTo,
                    criteria: discountRules.criteria,
                    discountType: discountRules.discountType,
                    discountValue: discountRules.discountValue,
                    effectiveDate: discountRules.effectiveDate.split("T")[0], // Extract date part
                    expiryDate: discountRules.expiryDate.split("T")[0], // Extract date part
                });
            } catch (err) {
                console.error("Error fetching discount rules:", err); // Debugging
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountRules();
    }, [discountId, productId, setBtn, setGoBackUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormPageHeader />
            <div className="container">
                <div className="form-container">
                    <h2>Display Discount Rules</h2>

                    {/* Display error message if discount rules are not found or do not match */}
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
                                        // disabled
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="productId">Product ID</label>
                                    <input
                                        type="text"
                                        id="productId"
                                        name="productId"
                                        value={formData.productId}
                                        // disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Item Box */}
                        <div className="item-box">
                            <h2>Item</h2>

                            <div className="data-container">
                                <div className="data">
                                    <label htmlFor="applicableTo">Applicable to</label>
                                    <input
                                        type="text"
                                        id="applicableTo"
                                        name="applicableTo"
                                        value={formData.applicableTo}
                                        // disabled
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="criteria">Criteria</label>
                                    <input
                                        type="text"
                                        id="criteria"
                                        name="criteria"
                                        value={formData.criteria}
                                        // disabled
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="discountType">Discount Type</label>
                                    <input
                                        type="text"
                                        id="discountType"
                                        name="discountType"
                                        value={formData.discountType}
                                        // disabled
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="discountValue">Discount Value</label>
                                    <input
                                        type="text"
                                        id="discountValue"
                                        name="discountValue"
                                        value={formData.discountValue}
                                        // disabled
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="effectiveDate">Effective Date</label>
                                    <input
                                        type="date"
                                        id="effectiveDate"
                                        name="effectiveDate"
                                        value={formData.effectiveDate}
                                        // disabled
                                    />
                                </div>

                                <div className="data">
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input
                                        type="date"
                                        id="expiryDate"
                                        name="expiryDate"
                                        value={formData.expiryDate}
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