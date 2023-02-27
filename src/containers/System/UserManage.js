import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils";

import "./UserManage.scss";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.handleGetAllUsers();
    }

    handleGetAllUsers = async () => {
        let response = await userService.getUser("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    toggleUserModal() {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.addNewUser(data);
            if (response && response.errCode === 0) {
                await this.handleGetAllUsers();
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit();
            } else {
                return response;
            }
        } catch (e) {}
    };

    handleDeleteUser = async (id) => {
        try {
            console.log(id);
            let response = await userService.deleteUser(id);
            if (response && response.errCode === 0) {
                await this.handleGetAllUsers();
            }
        } catch (e) {}
    };
    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={() => this.toggleUserModal()}
                    size="lg"
                    centered
                    createNewUser={this.createNewUser}
                    className="modal-user-container"
                />
                <div className="text-center">
                    <h1>Manage users</h1>
                </div>
                <div className="mx-4">
                    <button
                        className="addUser-btn btn btn-primary"
                        onClick={() => {
                            this.toggleUserModal();
                        }}>
                        <i className="fas fa-user-plus"></i> Add a new User
                    </button>
                </div>
                <div className="table-user mt-4 mx-1">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>RoleId</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrUsers &&
                                this.state.arrUsers.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.email}</td>
                                            <td>{value.firstName}</td>
                                            <td>{value.lastName}</td>
                                            <td>{value.address}</td>
                                            <td>{value.phoneNumber}</td>
                                            <td>{value.roleId}</td>
                                            <td className="text-center">
                                                <button className="edit-btn">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="delete-alt"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            value.id
                                                        )
                                                    }>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
