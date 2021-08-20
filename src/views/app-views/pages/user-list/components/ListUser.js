import React, { Component } from 'react'
import { Card, Table, Tag, Tooltip, message, Button, Modal, Form, Input, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import UsersService from 'services/UsersService';
import usersReducer from 'redux/reducers/Users';
import UpdateUserComponent from './UpdateUsers';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import Flex from 'components/shared-components/Flex';
import CreateUserComponent from './CreateUser';

//Sagas
import { getListUser,deleteUser } from 'redux/actions/Users';

export class UserList extends Component {

    componentDidMount() {
        console.log("Prueba");
        this.props.getListUser();
    }


    tempUser =
        {
            id: '',
            name: '',
            document: '',
            email: '',
            address: '',
            phone: ''
        }

    state = {
        loading: false,
        visible: false,
        updating: false
    }

    handleOk = () => {
        this.setState({ loading: true });
        this.submitUser();
        setTimeout(() => {
            this.setState({ loading: false, visible: false });

            //Mensaje de error
            if (this.succeeded == true) {
                this.success();
            }
            else {
                this.error();
            }
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    deleteUser = user => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta Seguro que desea eliminar este usuario',
            okText: 'Si',
            cancelText: 'No',
            onOk: () => {

                this.props.deleteUser(user);

                Modal.success({
                    title: 'Eliminación Exitosa',
                    content: 'Se ha eliminado el usuario correctamente',
                    onOk() { //Funcion de Ok

                    }
                });
            }
        });
    }

    render() {
        //Traer Usuarios

        const { users, userProfileVisible, selectedUser } = this.state;

        const tableColumns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                render: (_, record) => (

                    <span>{record.name} </span>
                ),
                sorter: {
                    compare: (a, b) => {
                        a = a.name.toLowerCase();
                        b = b.name.toLowerCase();
                        return a > b ? -1 : b > a ? 1 : 0;
                    },
                },
            },
            {
                title: 'Documento',
                dataIndex: 'document',
                render: (_, record) => (

                    <span>{record.document} </span>
                )
            },
            {
                title: 'Correo',
                dataIndex: 'email',
                render: (_, record) => (

                    <span>{record.email} </span>
                )
            },
            {
                title: 'Dirección',
                dataIndex: 'address',
                render: (_, record) => (

                    <span>{record.address} </span>
                )
            },
            {
                title: 'Telefono',
                dataIndex: 'phone',
                render: (_, record) => (

                    <span>{record.phone} </span>
                )
            },
            /*
            {
                title: 'Rol',
                dataIndex: 'role',
                render: (_, record) => (

                    <span>{record.role == 1 ? 'Administrador' : 'Usuario'} </span>
                )
            },*/
            {
                title: '',
                dataIndex: 'actions',
                render: (_, elm) => (
                    <div className="text-right d-flex justify-content-end">
                        <Tooltip title="View">
                            <UpdateUserComponent actualUser={elm} />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button danger icon={<DeleteOutlined />} onClick={() => { this.deleteUser(elm) }} size="small" />
                        </Tooltip>
                    </div>
                )
            }
        ];
        return (
            <>
                <PageHeaderAlt className="border-bottom">
                    <div className="container-fluid">
                        <Flex justifyContent="between" alignItems="center" className="py-4">
                            <h2>Lista de Usuarios</h2>
                            <div>
                                <CreateUserComponent />
                            </div>
                        </Flex>
                    </div>
                </PageHeaderAlt>
                <br />
                <Card bodyStyle={{ 'padding': '0px' }}>
                    <div className="table-responsive">
                        <Table columns={tableColumns} dataSource={this.props.users} rowKey='id' />
                    </div>
                </Card>
            </>





        )
    }
}

const mapStateToProps = ({ usersReducer }) => {
    const { loading, users } = usersReducer;
    return { loading, users }
}

const mapDispatchToProps = {
    getListUser,deleteUser
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList)