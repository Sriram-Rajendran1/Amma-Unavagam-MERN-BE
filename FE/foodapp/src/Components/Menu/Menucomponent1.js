import React, { useEffect, useState } from "react";
import "../Menu/Menucomponent1.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addDishes } from "../../features/OrderSlice";
import { MenuList } from "../../features/MenuSlice";

const Menucomponent1 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchparams = new URLSearchParams(location.search);
  const mealtype = searchparams.get("mealtype");

  const { isLoading, isError, items, message } = useSelector(
    (state) => state.menuslice
  );

  const dish = useSelector((state) => state.orderslice.dishes);

  const orderid = dish?.map((item) => item.id);

  const [currentMealtype, setCurrentMealtype] = useState("");

  useEffect(() => {
    if (mealtype) {
      setCurrentMealtype(mealtype);
    } else {
      setCurrentMealtype("all");
    }
    dispatch(MenuList());
  }, [mealtype, dispatch]);

  const breakFastDishes = items.data.filter(
    (item) => item.mealtype === "Breakfast"
  );

  const lunchDishes = items.data.filter((item) => item.mealtype === "Lunch");

  const dinnerDishes = items.data.filter((item) => item.mealtype === "Dinner");

  const handleorder = (id, dish, price, mealtype, image) => {
    const orderdish = {
      dish: dish,
      price: price,
      id: id,
      quantity: 1,
      totalprice: price,
      mealtype: mealtype,
      image: image,
    };
    dispatch(addDishes(orderdish));
  };

  const BackendENDPOINT = "http://localhost:5000";

  return (
    <div className="menucomp1maindiv">
      {isLoading && <p>Loading Your Menu...</p>}
      {isError && <p>{message}</p>}
      {currentMealtype === "Breakfast" && (
        <div className="menucomp1meal1div">
          <div className="menucomp1title">
            <h2>Breakfast</h2>
          </div>
          <div className="menucomp1content">
            {breakFastDishes.map((item, index) => (
              <div className="menucompdiv1" key={index}>
                <div
                  className="imgdiv"
                  style={{
                    backgroundImage: `url(${BackendENDPOINT}${item.image})`,
                  }}
                ></div>
                <div className="in-cotdiv">
                  <div className="dishdiv">{item.dish}</div>
                  <div className="pricediv">Price : {item.price}</div>
                  <div className="buttonmaindiv">
                    <button
                      className="buttondiv"
                      type="button"
                      onClick={() =>
                        handleorder(
                          item._id,
                          item.dish,
                          item.price,
                          item.mealtype,
                          item.image
                        )
                      }
                      disabled={orderid.includes(item._id)}
                    >
                      {orderid.includes(item._id) ? `Ordered` : `Order-Now`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr />
      {currentMealtype === "Lunch" && (
        <div className="menucomp1meal1div">
          <div className="menucomp1title">
            <h2>Lunch</h2>
          </div>
          <div className="menucomp1content">
            {lunchDishes.map((item, index) => (
              <div className="menucompdiv1">
                <div
                  className="imgdiv"
                  style={{
                    backgroundImage: `url(${BackendENDPOINT}${item.image})`,
                  }}
                ></div>
                <div className="in-cotdiv">
                  <div className="dishdiv">{item.dish}</div>
                  <div className="pricediv">Price : {item.price}</div>
                  <div className="buttonmaindiv">
                    <button
                      className="buttondiv"
                      type="button"
                      onClick={() =>
                        handleorder(
                          item._id,
                          item.dish,
                          item.price,
                          item.mealtype,
                          item.image
                        )
                      }
                      disabled={orderid.includes(item._id)}
                    >
                      {orderid.includes(item._id) ? `Ordered` : `Order-Now`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <hr />
      {currentMealtype === "Dinner" && (
        <div className="menucomp1meal1div">
          <div className="menucomp1title">
            <h2>Dinner</h2>
          </div>
          <div className="menucomp1content">
            {dinnerDishes.map((item, index) => (
              <div className="menucompdiv1">
                <div
                  className="imgdiv"
                  style={{
                    backgroundImage: `url(${BackendENDPOINT}${item.image})`,
                  }}
                ></div>
                <div className="in-cotdiv">
                  <div className="dishdiv">{item.dish}</div>
                  <div className="pricediv">Price : {item.price}</div>
                  <div className="buttonmaindiv">
                    <button
                      className="buttondiv"
                      type="button"
                      onClick={() =>
                        handleorder(
                          item._id,
                          item.dish,
                          item.price,
                          item.mealtype,
                          item.image
                        )
                      }
                      disabled={orderid.includes(item._id)}
                    >
                      {orderid.includes(item._id) ? `Ordered` : `Order-Now`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {currentMealtype === "all" && (
        <div>
          <div className="menucomp1meal1div">
            <div className="menucomp1title">
              <h2>Breakfast</h2>
            </div>
            <div className="menucomp1content">
              {breakFastDishes.map((item, index) => (
                <div className="menucompdiv1" key={index}>
                  <div
                    className="imgdiv"
                    style={{
                      backgroundImage: `url(${BackendENDPOINT}${item.image})`,
                    }}
                  ></div>
                  <div className="in-cotdiv">
                    <div className="dishdiv">{item.dish}</div>
                    <div className="pricediv">Price : {item.price}</div>
                    <div className="buttonmaindiv">
                      <button
                        key={item.index}
                        className="buttondiv"
                        type="button"
                        onClick={() =>
                          handleorder(
                            item._id,
                            item.dish,
                            item.price,
                            item.mealtype,
                            item.image
                          )
                        }
                        disabled={orderid.includes(item._id)}
                      >
                        {orderid.includes(item._id) ? `Ordered` : `Order-Now`}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="menucomp1meal1div">
            <div className="menucomp1title">
              <h2>Lunch</h2>
            </div>
            <div className="menucomp1content">
              {lunchDishes.map((item, index) => (
                <div className="menucompdiv1" key={index}>
                  <div
                    className="imgdiv"
                    style={{
                      backgroundImage: `url(${BackendENDPOINT}${item.image})`,
                    }}
                  ></div>
                  <div className="in-cotdiv">
                    <div className="dishdiv">{item.dish}</div>
                    <div className="pricediv">Price : {item.price}</div>
                    <div className="buttonmaindiv">
                      <button
                        className="buttondiv"
                        type="button"
                        onClick={() =>
                          handleorder(
                            item._id,
                            item.dish,
                            item.price,
                            item.mealtype,
                            item.image
                          )
                        }
                        disabled={orderid.includes(item._id)}
                      >
                        {orderid.includes(item._id) ? `Ordered` : `Order-Now`}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="menucomp1meal1div">
            <div className="menucomp1title">
              <h2>Dinner</h2>
            </div>
            <div className="menucomp1content">
              {dinnerDishes.map((item, index) => (
                <div className="menucompdiv1" key={index}>
                  <div
                    className="imgdiv"
                    style={{
                      backgroundImage: `url(${BackendENDPOINT}${item.image})`,
                    }}
                  ></div>
                  <div className="in-cotdiv">
                    <div className="dishdiv">{item.dish}</div>
                    <div className="pricediv">Price : {item.price}</div>
                    <div className="buttonmaindiv">
                      <button
                        className="buttondiv"
                        type="button"
                        onClick={() =>
                          handleorder(
                            item._id,
                            item.dish,
                            item.price,
                            item.mealtype,
                            item.image
                          )
                        }
                        disabled={orderid.includes(item._id)}
                      >
                        {orderid.includes(item._id) ? `Ordered` : `Order-Now`}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menucomponent1;
