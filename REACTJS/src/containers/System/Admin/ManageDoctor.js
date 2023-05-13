/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkDownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getAllDoctors } from "../../../services/userService";

const mdParser = new MarkDownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
    };
  }

  async componentDidMount() {
    // await this.getAllDoctor();
    this.props.fetchAllDoctors();
  }

  //   getAllDoctor = async () => {
  //     let response = await getAllDoctors();
  //     if (response && response.errCode === 0) {
  //       this.setState({
  //         listDoctors: response.data,
  //       });
  //     }
  //   };

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        console.log("item", item);
        let object = {};
        object.label = `${item.lastName} ${item.firstName}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);

      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
    console.log(`Option selected:`, selectedDoctor);
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  render() {
    console.log("state", this.props.allDoctors);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tao them thong tin doctors</div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>Chon bac si</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right ">
            <label>Thong tin gioi thieu</label>
            <textarea
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={this.state.description}
              className="form-control"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-edittor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className="save-content-doctor"
        >
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: (id) => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
