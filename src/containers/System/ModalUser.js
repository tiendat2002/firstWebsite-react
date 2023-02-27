import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            },
            errMessage: "",
        };
    }

    toggle() {
        this.props.toggle();
    }

    handleOnChangeInput(e) {
        let userInfo = this.state.user;
        userInfo[e.target.name] = e.target.value;
        this.setState({
            user: userInfo,
        });
    }

    checkValidateInput = () => {
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.user[arrInput[i]]) {
                return false;
            }
        }
        return true;
    };

    handleAddNewUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            let response = await this.props.createNewUser(this.state.user);
            if (response.errCode !== 0) {
                this.setState({
                    errMessage: response.errMessage,
                });
            }
        }
    };

    render() {
        return (
            <Modal {...this.props} className={this.props.className}>
                <ModalHeader toggle={() => this.toggle()}>
                    Create a new User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                value={this.state.user.email}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e)
                                }></input>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.user.password}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e)
                                }></input>
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.user.firstName}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e)
                                }></input>
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.user.lastName}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e)
                                }></input>
                        </div>
                        <div className="input-container max-width">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={this.state.user.address}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e)
                                }></input>
                        </div>
                    </div>
                    <div className="message-err">
                        {this.state.errMessage ? this.state.errMessage : ""}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-2"
                        onClick={() => this.handleAddNewUser()}>
                        Save
                    </Button>{" "}
                    <Button
                        color="secondary"
                        className="px-2"
                        onClick={() => this.toggle()}>
                        Cancels
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
