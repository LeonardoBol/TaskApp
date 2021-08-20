import React, { useState } from 'react'
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { LockOutlined } from '@ant-design/icons';
import { restorePasswordService } from '../../../../services/AuthService';
import queryString from 'query-string';

const backgroundStyle = {
    backgroundImage: 'url(/img/others/img-17.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}

const RestorePassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    //Mensajes
    const errorMessage = () => {
        setTimeout(() => {
            setLoading(false);
            message.error("Ha ocurrido un error en el servidor");
        }, 500);
    }
    const successMessage = () => {
        setTimeout(() => {
            setLoading(false);
            message.success("Se ha cambiado la contraseña correctamente");
        }, 500);
    }

    //Envio de la Peticion
    const onSend = values => {
        if (values.password == values.confirm_password) {
            const parsed = queryString.parse(window.location.search);

            if (parsed.token != undefined) {
                console.log(parsed.token);

                try {
                    const restored = restorePasswordService(values.password, parsed.token);
                    if (restored != undefined) {
                        successMessage();
                        
                        //Redireccion
                        setLoading(true);
                        setTimeout(() => {
                            window.location.href = "/auth/login";
                        }, 1500);
                    }
                    else {
                        errorMessage();
                    }
                }
                catch (err) {
                    errorMessage();
                }
            }
            else {
                setTimeout(() => {
                    setLoading(false);
                    message.error("Ha ocurrido un error en el servidor");
                }, 500);
            }
        }
        else {
            setTimeout(() => {
                setLoading(false);
                message.error("Las contraseñas no coinciden");
            }, 500);
        }
    };

    return (
        <div className="h-100" style={backgroundStyle}>
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={9}>
                        <Card>
                            <div className="my-2">
                                <div className="text-center">
                                    {/*

									<img className="img-fluid" src="/img/logo.png" alt="" />

									*/

                                    }
                                    <h3 className="mt-3 font-weight-bold">Recuperar Contraseña</h3>
                                    <p className="mb-4">Escriba su nueva contraseña
                                    </p>
                                </div>
                                <Row justify="center">
                                    <Col xs={24} sm={24} md={20} lg={20}>
                                        <Form form={form} layout="vertical" name="new_password" onFinish={onSend}>
                                            <Form.Item name="password" label={<div className='d-flex justify-content-between w-100 align-items-center'><span>Contraseña</span></div>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Por favor escriba su contraseña',
                                                    }
                                                ]}
                                            >
                                                <Input.Password prefix={<LockOutlined className="text-primary" />} />
                                            </Form.Item>
                                            <Form.Item name="confirm_password" label={<div className='d-flex justify-content-between w-100 align-items-center'><span>Confirmar Contraseña</span></div>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Por favor confirme su contraseña ',
                                                    }
                                                ]}
                                            >
                                                <Input.Password prefix={<LockOutlined className="text-primary" />} />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button loading={loading} type="primary" htmlType="submit" block>{loading ? 'Actualizando' : 'Actualizar'}</Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default RestorePassword

