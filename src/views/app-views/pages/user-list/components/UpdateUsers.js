import { Form, Input, Button, Row, Col, Image, Modal } from 'antd';
import UsersService from 'services/UsersService';
import React, { Component } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { updateUser } from 'redux/actions/Users';




class UpdateUserComponent extends Component {

    sucessfuled = false;
    user =
        {
            id: '',
            name: '',
            document: '',
            email: '',
            address: '',
            phone: ''
        }

    constructor(props) {
        super(props);

        //Usuario
        this.user.id = props.actualUser.id;
        this.user.name = props.actualUser.name;
        this.user.document = props.actualUser.document;
        this.user.email = props.actualUser.email;
        this.user.address = props.actualUser.address;
        this.user.phone = props.actualUser.phone;

        this.myRef = React.createRef();
    }

    /***********Modal *********/
    state = {
        loading: false,
        visible: false,
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
            this.setState({ loading: false, visible: false });

            //Mensaje de error
            if (this.sucessfuled == true) {
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


    //*********Atributos de Usuario****************

    handleNameRegisterChange = (e) => {
        this.user.name = e.target.value;
    }

    handleDocumentRegisterChange = (e) => {
        this.user.document = e.target.value;
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
        this.props.updateUser(this.user);


        this.sucessfuled = true;
        
        /*
        UsersService.updateUser(this.user).then(res => {
            this.sucessfuled = true;
            
        }).catch(error => {
            this.sucessfuled = false;
        });
        */
    }

    //*********Mensajes ok error****************
    success() {
        Modal.success({
            title: 'Actualización exitosa',
            content: 'Se ha actualizado el usuario correctamente',
            onOk() { //Funcion de Ok
                //window.location.reload();
            }
        });
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
                <Button type="primary" className="mr-2" icon={<EyeOutlined />} size="small" onClick={this.showModal}>
                    
                </Button>
                <Modal
                    visible={visible}
                    title="Actualizar Usuario"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Actualizar
                        </Button>,
                    ]}
                >
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Form layout="vertical" name="register" initialValues={{ remember: true }}>
                                <Form.Item label="Nombres y apellidos" id="name" name="name" rules={[{ required: true, message: 'Por favor escriba el nombre de usuario' }]}>
                                    <Input onChange={this.handleNameRegisterChange} value={this.user.name} defaultValue={this.user.name} />
                                </Form.Item>
                                <Form.Item label="Número de Documento" id="document" name="document" rules={[{ required: true, message: 'Por favor escriba el numero de documento del usuario' }]}>
                                    <Input onChange={this.handleDocumentRegisterChange} value={this.user.document} defaultValue={this.user.document} />
                                </Form.Item>
                                <Form.Item label="Correo Electronico" id="email" name="email" rules={[{ required: true, type: 'email', message: 'Por favor escriba un correo electronico para este usuario' }]}>
                                    <Input onChange={this.handleEmailRegisterChange} value={this.user.email} defaultValue={this.user.email} />
                                </Form.Item>
                                <Form.Item label="Dirección de Residencia" id="address" name="address" rules={[{ required: true, message: 'Por favor escriba la direccion de residencia del usuario' }]}>
                                    <Input onChange={this.handleAddressRegisterChange} value={this.user.address} defaultValue={this.user.address} />
                                </Form.Item>
                                <Form.Item label="Celular" id="phone" name="phone" rules={[{ required: true, message: 'Por favor escriba el celular del usuario' }]}>
                                    <Input onChange={this.handlePhoneRegisterChange} value={this.user.phone} defaultValue={this.user.phone} />
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
    updateUser
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserComponent)