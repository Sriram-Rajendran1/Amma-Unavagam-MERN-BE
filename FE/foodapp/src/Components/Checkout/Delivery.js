import React, { useState } from "react";
import "../../Components/Checkout/Delivery.css";
import { deliverydetails, orderDetailsData } from "../../features/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOrders } from "../../features/OrderSlice";
const Delivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message } = useSelector((state) => state.orderslice);

  const [deliverydata, setDeliveryData] = useState({
    name: "",
    phone: "",
    landmark: "",
    address: "",
  });
  const [showform, setShowForm] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleDevInp = (e) => {
    setDeliveryData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handledevsubmit = () => {
    dispatch(deliverydetails(deliverydata));
    setDeliveryData({
      name: "",
      phone: "",
      landmark: "",
      address: "",
    });
    dispatch(orderDetailsData());
    setShowForm(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      navigate("/");
      dispatch(clearOrders());
    }, 3000);
  };

  const isFormValid = () => {
    return (
      deliverydata.name.trim() !== "" &&
      deliverydata.phone.trim() !== "" &&
      deliverydata.landmark.trim() !== "" &&
      deliverydata.address.trim() !== ""
    );
  };

  return (
    <div>
      <div className="dl-headmain">
        <h2 className="dl-heading1">Delivery Details</h2>
      </div>
      {showMessage && <div className="orderplaced">{message}</div>}
      {showform && (
        <div className="form-dl-divmain">
          <div className="dl-name">
            <div className="namediv">
              <label type="name">Name : </label>
            </div>
            <div className="inputdiv">
              <input
                type="text"
                name="name"
                onChange={handleDevInp}
                value={deliverydata.name}
              />
            </div>
          </div>
          <div className="dl-phone">
            <div className="namediv">
              <label type="name">Phone : </label>
            </div>
            <div className="inputdiv">
              <input
                type="tel"
                name="phone"
                onChange={handleDevInp}
                value={deliverydata.phone}
              />
            </div>
          </div>
          <div className="dl-landmark">
            <div className="namediv">
              <label type="name">Landmark : </label>
            </div>
            <div className="inputdiv">
              <input
                type="text"
                name="landmark"
                onChange={handleDevInp}
                value={deliverydata.landmark}
              />
            </div>
          </div>
          <div className="dl-address">
            <div className="namediv">
              <label type="name">Address : </label>
            </div>
            <div className="inputdiv">
              <input
                type="text"
                name="address"
                onChange={handleDevInp}
                value={deliverydata.address}
              />
            </div>
          </div>
          <div className="dl-buttondiv">
            <button
              className="dl-btn"
              type="button"
              disabled={!isFormValid()}
              style={{
                backgroundColor: isFormValid() ? "black" : "grey",
                cursor: isFormValid() ? "pointer" : "not-allowed",
              }}
              onClick={handledevsubmit}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delivery;
