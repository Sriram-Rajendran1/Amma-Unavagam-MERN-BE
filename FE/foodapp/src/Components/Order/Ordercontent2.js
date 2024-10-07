import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Order/Ordercontent2.css";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  finalPrice,
} from "../../features/OrderSlice";

const Ordercontent2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dishes, finalprice } = useSelector((state) => state.orderslice);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  useEffect(() => {
    const totalPrice = dishes.reduce(
      (acc, dish) => acc + dish.price * dish.quantity,
      0
    );
    dispatch(finalPrice(totalPrice));
  }, [dishes, dispatch]);

  const backendENDPOINT = `http://localhost:5000`;

  return (
    <div className="ordercontent2-maindiv">
      <div className="ordercontent2-headdivmain">
        <div className="ordered-items-div">Ordered Items</div>
        <div className="quantity-div">Quantity</div>
        <div className="price-div">Price of Item</div>
        <div className="price-with-quantity-div">Price with Quantity</div>
      </div>
      <div className="ordercontent2-contentdivmain">
        {!dishes || dishes.length <= 0 ? (
          <div className="norder">
            <h3>No Dishes has been selected to place an Order</h3>
          </div>
        ) : (
          dishes.map((dish, index) => (
            <div className="ordercontent2-listdivmain" key={index}>
              <div className="sn-items-div">
                <div className="sno-div">{index + 1}.</div>
                <div
                  className="orderimg"
                  style={{
                    backgroundImage: `url(${backendENDPOINT}${dish.image})`,
                  }}
                ></div>
                <div className="item-div">{dish.dish}</div>
              </div>
              <div className="quantites-div">
                <button
                  type="button"
                  className="quantitybuttons"
                  onClick={() => handleIncrement(dish.id)}
                >
                  +
                </button>
                <div className="quantites-div-final">{dish.quantity}</div>
                <button
                  type="button"
                  className="quantitybuttons"
                  onClick={() => handleDecrement(dish.id)}
                >
                  -
                </button>
              </div>
              <div className="price-contentdiv">{dish.price}</div>
              <div className="pricewithquantity-contentdiv">
                {dish.price}*{dish.quantity} = {dish.price * dish.quantity}
              </div>
            </div>
          ))
        )}
        <hr />
        {dishes.length <= 0 ? (
          <div></div>
        ) : (
          <>
            <div className="totalpricediv">
              <span className="span1">Total Price : </span>
              <span className="span2">{finalprice}</span>
            </div>
            <div className="proceedtocheckoutmaindiv">
              <button
                className="proceedtocheckoutbutton"
                onClick={handleCheckout}
                type="button"
              >
                Procced to Check-out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Ordercontent2;
