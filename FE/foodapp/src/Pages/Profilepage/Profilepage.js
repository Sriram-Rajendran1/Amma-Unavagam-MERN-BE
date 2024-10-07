import { useSelector, useDispatch } from "react-redux";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { logout } from "../../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { clearOrders } from "../../features/OrderSlice";
import "../Profilepage/Profilepage.css";

const Profilepage = () => {
  const user = useSelector((state) => state.authslice.user);
  const orderHistory = useSelector((state) => state.orderslice.orderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    dispatch(clearOrders());
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="profiledivmain">
        <div className="pdmaindiv">
          <h2>Please Find Your Profile Here</h2>
        </div>
        <div className="detailsdiv">
          <div className="username">{user.data.username}</div>
          <div className="email">{user.data.email}</div>
          <button className="logoutbtn" onClick={handlelogout}>
            Logout
          </button>
        </div>
      </div>

      {orderHistory && orderHistory.length > 0 ? (
        <div className="deliverydivmain">
          <div className="deliveryheadermain">
            <h1 className="deliverytitle">
              Please Find Your Recent Orders Below
            </h1>
          </div>
          <div>
            <div className="dmaincontainer">
              {orderHistory.map((order) => (
                <div>
                  <div>
                    <h2 className="dish">Ordered Dish Details</h2>
                    {order.dishes.map((dish, sn) => (
                      <div>
                        <div className="dishdive" key={sn}>
                          <p className="dish1">
                            <strong>Dish :</strong> {dish.dish}
                          </p>
                          <p className="dish1">
                            <strong>Quantity :</strong> {dish.quantity}
                          </p>
                          <p className="dish1">
                            <strong>Price :</strong> {dish.price}
                          </p>
                          <p className="dish1">
                            <strong>Mealtype :</strong> {dish.mealtype}
                          </p>
                          <hr />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {
                      <div
                        style={{
                          textAlign: "center",
                          fontFamily: "cursive",
                          padding: "2rem",
                        }}
                      >
                        <h2>
                          Total Price : <span>{order.finalprice}</span>
                        </h2>
                        <hr />
                      </div>
                    }
                  </div>
                  <div>
                    <div>
                      <h2 style={{ padding: "1rem" }}>
                        Ordered Delivery Details
                      </h2>
                      <p className="del">
                        <strong>Ordered Placed to :</strong>{" "}
                        {order.deliverydetails.name}
                      </p>
                      <p className="del">
                        <strong>Phone :</strong> {order.deliverydetails.phone}
                      </p>
                      <p className="del">
                        <strong>Landmark :</strong>{" "}
                        {order.deliverydetails.landmark}
                      </p>
                      <p className="del">
                        <strong>Delivery Address : </strong>
                        {order.deliverydetails.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <Footer />
    </div>
  );
};

export default Profilepage;
