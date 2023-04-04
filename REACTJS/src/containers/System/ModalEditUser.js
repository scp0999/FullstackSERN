import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { idText } from "typescript";
import { emitter } from "../../utils";
import _ from 'lodash';

class ModalEditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

  }

  componentDidMount() {
    let user = this.props.currentUser;
    // let {currentUser} =this.props;
    if(user && !_.isEmpty(user)){
        this.setState({
            id: user.id,
            email: user.email,
            password: "harCode",
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
        })
    }
    console.log('didmount edit modal', this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () =>{
    let isValid = true;
    let arrInput = ['email','password','firstName','lastName','address'];
    for (let i=0; i< arrInput.length;i++){
      if(!this.state[arrInput[i]]){
        isValid = false;
        alert('Missing parameter: ' + arrInput[i]);
        break;
      }
    }
    return isValid;
  }

  handleSaveUser = () =>{
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api edit user modal
      this.props.editUser(this.state);
    }
  }

  render() {
    // console.log("check child props", this.props);
    // console.log("check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a user
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value = {this.state.email}
                  disabled
                />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  value = {this.state.password}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="firstName"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  value = {this.state.firstName}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="lastName"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  value = {this.state.lastName}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value = {this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save Changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
