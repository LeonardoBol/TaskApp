import { Form, Input, Button, Row, Col, Image, Modal } from 'antd';
import UsersService from 'services/UsersService';
import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { createUser } from 'redux/actions/Users';


class CreateUserComponent extends Component {
    user =
        {
            id: '',
            name: '',
            document: '',
            password: '',
            email: '',
            address: '',
            phone: ''
        }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    /***********Modal *********/
    state = {
        loading: false,
        visible: false,
        success: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        this.submitUser();
        setTimeout(() => {

            if(this.state.success == true)
            {
                this.success();
                this.setState({ loading: false, visible: false });
            }
            else
            {
                this.error();
            }

            
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    //*********Atributos de Usuario****************

    handleNameRegisterChange = (e) => {
        this.user.name = e.target.value;
    }

    handleDocumentRegisterChange = (e) => {
        this.user.document = e.target.value;
    }

    handlePasswordRegisterChange = (e) => {
        this.user.password = e.target.value;
    }

    handleEmailRegisterChange = (e) => {
        this.user.email = e.target.value;
    }

    handleAddressRegisterChange = (e) => {
        this.user.address = e.target.value;
    }

    handlePhoneRegisterChange = (e) => {
        this.user.phone = e.target.value;
    }


    //Registro del Usuario y consumo a la API
    submitUser = () => {
        this.props.createUser(this.user);
        this.setState({ success: true });
    }

    //*********Mensajes ok error****************
    success() {
        let closeModal = false;

        Modal.success({
            title: 'Creación exitosa',
            content: 'Se ha creado el usuario correctamente',
            onOk() { //Funcion de Ok
                closeModal = true;
                //window.location.reload();
            }
        });

        if(closeModal == true)
        {
            this.setState({ visible: false });
        }
        
    }

    error() {
        Modal.error({
            title: 'Error',
            content: 'Ha ocurrido un error en el servidor',
        });
    }

    render() {
        const { visible, loading } = this.state;
        return (
            <>
                <Button type="primary" className="ml-2" onClick={this.showModal}>
                    <PlusOutlined />
                    <span>Nuevo Usuario</span>
                </Button>
                <Modal
                    visible={visible}
                    title="Crear Usuario"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Crear
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Form layout="vertical" name="register" initialValues={{ remember: true }}>
                                <Form.Item label="Nombres y apellidos" id="name" name="name" rules={[{ required: true, message: 'Por favor escriba el nombre de usuario' }]}>
                                    <Input onChange={this.handleNameRegisterChange} value={this.user.name} />
                                </Form.Item>
                                <Form.Item label="Número de Documento" id="document" name="document" rules={[{ required: true, message: 'Por favor escriba el numero de documento del usuario' }]}>
                                    <Input onChange={this.handleDocumentRegisterChange} value={this.user.document} />
                                </Form.Item>
                                <Form.Item label="Contraseña" id="password" name="password" rules={[{ required: true, message: 'Por favor escriba una contraseña para este usuario' }]}>
                                    <Input.Password onChange={this.handlePasswordRegisterChange} value={this.user.password} />
                                </Form.Item>
                                <Form.Item label="Correo Electronico" id="email" name="email" rules={[{ required: true, type: 'email', message: 'Por favor escriba un correo electronico para este usuario' }]}>
                                    <Input onChange={this.handleEmailRegisterChange} value={this.user.email} />
                                </Form.Item>
                                <Form.Item label="Dirección de Residencia" id="address" name="address" rules={[{ required: true, message: 'Por favor escriba la direccion de residencia del usuario' }]}>
                                    <Input onChange={this.handleAddressRegisterChange} value={this.user.address} />
                                </Form.Item>
                                <Form.Item label="Celular" id="phone" name="phone" rules={[{ required: true, message: 'Por favor escriba el celular del usuario' }]}>
                                    <Input onChange={this.handlePhoneRegisterChange} value={this.user.phone} />
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = ({ usersReducer }) => {
    const { loading, user } = usersReducer;
    return { loading, user }
}

const mapDispatchToProps = {
    createUser
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserComponent)