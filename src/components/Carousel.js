import React from "react";

function Carousel() {
  return (
    <div
      id="carousel-example-multi"
      className="carousel slide carousel-multi-item v-2"
      data-ride="carousel"
    >
      <div className="controls-top">
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

      <ol className="carousel-indicators">
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
          <div className="col-12 col-md-4">
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Others/img (36).jpg"
                alt="Card image cap"
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold">Card title</h4>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="col-12 col-md-4">
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Others/img (34).jpg"
                alt="Card image cap"
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold">Card title</h4>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="col-12 col-md-4">
            <div className="card mb-2">
              <img
                className="card-img-top"
                src="https://mdbootstrap.com/img/Photos/Others/img (38).jpg"
                alt="Card image cap"
              />
              <div className="card-body">
                <h4 className="card-title font-weight-bold">Card title</h4>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
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
