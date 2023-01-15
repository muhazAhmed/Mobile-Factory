import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Link className="link" to="/" style={{ cursor: "pointer" }}>
        <div className="dashboard-main">
          <div className="image">
            <img
              src="https://img3.gadgetsnow.com/gd/images/products/additional/large/G368929_View_1/mobiles/smartphones/realme-10-pro-plus-128-gb-dark-matter-6-gb-ram-.jpg"
              alt="mobile"
            />
            <div className="body">
              <h3>Realme 10 pro +</h3>
              <h4>6GB, 8GB</h4>
              <h3>Fastest phone under 25000</h3>
              <h3>
                <button>4.4 ★</button>
              </h3>
              <h3>available</h3>
            </div>
          </div>
          <div>
            <h2>₹ 25,999</h2>
            <p>Check best deal on this phone right now!</p>
          </div>
        </div>
      </Link>

      <Link className="link" to="/" style={{ cursor: "pointer" }}>
        <div className="dashboard-main">
          <div className="image">
            <img
              src="https://www.91-img.com/gallery_images_uploads/3/f/3feaef23ac5b1fc3ae5ed26e54480d95023c06bb.jpg?tr=h-550,w-0,c-at_max"
              alt="mobile"
            />
            <div className="body">
              <h3>IPhone 14 pro</h3>
              <h4>6GB, 8GB, 12GB</h4>
              <h3>Best phone of 2022</h3>
              <h3>
                <button>5 ★</button>
              </h3>
              <h3>available</h3>
            </div>
          </div>
          <div>
            <h2>₹ 1,09,999</h2>
            <p>Check best deal on this phone right now!</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
