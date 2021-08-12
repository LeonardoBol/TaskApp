import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { signIn, showLoading, showAuthMessage, hideAuthMessage } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

export const LoginForm = props => {
	let history = useHistory();

	const {
		showForgetPassword,
		hideAuthMessage,
		showLoading,
		extra,
		signIn,
		token,
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect
	} = props

	const onLogin = values => {
		showLoading();
		signIn(values);
	};

	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if (showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});

	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: 'Por favor escriba su correo electronico',
						},
						{
							type: 'email',
							message: 'Por favor escriba un correo valido'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />} />
				</Form.Item>
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
					<a href="/auth/forgot-password" style={{position:'relative',top:'-20px'}} className="cursor-pointer font-size-sm font-weight-normal text-muted">
						Olvido su contraseña?
					</a>
					<br/>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Iniciar Sesión
					</Button>
				</Form.Item>
				{extra}
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: true
};

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
