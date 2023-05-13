/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    ></div>
  );
}

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <FormattedMessage id="homepage.handbook" />
            <span className="title-section"></span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <div>Cơ xương khớp</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
