import React, { useState } from 'react'
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { MailOutlined } from '@ant-design/icons';

import { forgotPassword } from '../../../../services/AuthService';

const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const ForgotPassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	//Mensajes
	const errorMessage = () => 
	{
		setTimeout(() => {
			setLoading(false);
			message.error("Ha ocurrido un error en el servidor");
		}, 500);
	}

	const successMessage = () => 
	{
		setTimeout(() => {
			setLoading(false);
			message.success("Se ha enviado un correo electronico");
		}, 500);
	}

	//Envio de la Peticion
	const onSend = values => {
		setLoading(true);

		const responForgotPassword = forgotPassword(values.email).then((response) => {

			if(response != undefined)
			{
				console.log(response);
				successMessage();
			}
			else
			{
				errorMessage();
			}
		}).catch(err => errorMessage());
			
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
									<h3 className="mt-3 font-weight-bold">Olvido su contraseña?</h3>
									<p className="mb-4">Escriba su correo electronico para enviarle un link de recuperacion
									</p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<Form form={form} layout="vertical" name="forget-password" onFinish={onSend}>
											<Form.Item
												name="email"
												rules={
													[
														{
															required: true,
															message: 'Por favor escriba su correo electronico'
														},
														{
															type: 'email',
															message: 'Por favor escriba un correo valido'
														}
													]
												}>
												<Input placeholder="Correo Electronico" prefix={<MailOutlined className="text-primary" />} />
											</Form.Item>
											<Form.Item>
												<Button loading={loading} type="primary" htmlType="submit" block>{loading ? 'Enviando' : 'Enviar'}</Button>
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

export default ForgotPassword

