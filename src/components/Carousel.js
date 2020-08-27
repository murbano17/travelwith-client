import React from "react";

function Carousel() {
  return (
    <div
      id="carousel-example-multi"
      className="carousel slide carousel-multi-item v-2"
      data-ride="carousel"
    >
      <div className="controls-top d-none">
        <a
          className="btn-floating"
          href="#carousel-example-multi"
          data-slide="prev"
        >
          <i className="fas fa-chevron-left"></i>
        </a>
        <a
          className="btn-floating"
          href="#carousel-example-multi"
          data-slide="next"
        >
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>

      <ol className="carousel-indicators d-none">
        <li
          data-target="#carousel-example-multi"
          data-slide-to="0"
          className="active"
          style={{ backgroundColor: "blue" }}
        ></li>
        <li
          data-target="#carousel-example-multi"
          data-slide-to="1"
          style={{ backgroundColor: "blue" }}
        ></li>
        <li
          data-target="#carousel-example-multi"
          data-slide-to="2"
          style={{ backgroundColor: "blue" }}
        ></li>
      </ol>

      <div className="carousel-inner v-2" role="listbox">
        <div className="carousel-item active">
          <div className="col-12 col-md-12">
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Others/img (36).jpg"
                alt="logo"
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold">TravelWith</h4>
                <p className="card-text">
                  Welcome to <b>TravelWith</b>, your best friend for organize every travel with (new) friends.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="col-12 col-md-12">
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Others/img (34).jpg"
                alt="card number 2"
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold">Create your own travel</h4>
                <p className="card-text">
                  Decide where do you wanna go. Add some details. Invite some Friends.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="col-12 col-md-12">
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Others/img (38).jpg"
                alt="Card number 3"
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold">Discover new people (and places)</h4>
                <p className="card-text">
                  Search for open plans and join to a new adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
