import React, { useEffect, useState } from 'react'
import {
    Modal, Row, Col,
    Button, Divider,
    Form, Input, Select,
    DatePicker,
} from 'antd';

import Attachments from 'components/tasks-components/attachments';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, getTasksList } from 'redux/actions';

export default function ModalCreateTask({ visible, hide }) {
    const { RangePicker } = DatePicker
    const { TextArea } = Input
    const rules = [{ required: true, message: 'Campo Vacio', }]
    const dispatch = useDispatch();

    const { uploading } = useSelector(state => state.tasksReducer);
    const { users } = useSelector(state => state.usersReducer);

    const userlist = () => {
        const list = [];
        users.map(v => {
            list.push(
                <Select.Option key={v.id} value={v.id} >{v.name}</Select.Option>
            )
        })
        return list;
    }
    const onSubmit = (values) => {
        const convertValues = {
            start_date: values.date[0].toISOString().substring(0, 10),
            end_date: values.date[1].toISOString().substring(0, 10),
            user: parseInt(values.user, 10),
        }
        const task = { ...values, ...convertValues }
        delete task.date;
        console.log("Ejecutando onSubmit modalCreateTask");
        dispatch(createTask(task));
        setTimeout(() => {
            dispatch(getTasksList())
            hide();
        }, 2000);
        
    }

    return (
        <>
            <Modal
                title="Crear Tarea"
                centered
                visible={visible}
                width={600}
                onCancel={hide()}
                onFinish={onSubmit}
                footer={[
                    <Button key="return" onClick={hide()}>
                        Cancelar
                    </Button>
                ]}
            >
                <Form
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 100,
                    }}
                    onFinish={onSubmit}
                    layout="horizontal"
                    size='small'
                >
                    <Form.Item label="Proyecto" rules={rules} name="project">
                        <Input allowClear={true} />
                    </Form.Item>
                    <Form.Item label="Nombre Tarea" rules={rules} name="subject">
                        <Input allowClear={true} />
                    </Form.Item>
                    <Form.Item label="Responsable" rules={rules} name="user">
                        <Select>
                            {userlist()}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Estado" rules={rules} name="status" initialValue={1}>
                        <Select>
                            <Select.Option value={1} >Nuevo</Select.Option>
                            <Select.Option value={2}>Pendiente</Select.Option>
                            <Select.Option value={3}>Resuelto</Select.Option>
                            <Select.Option value={4}>Cerrado</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Prioridad" rules={rules} name="priority" initialValue={1}>
                        <Select>
                            <Select.Option value={1}>Alta</Select.Option>
                            <Select.Option value={2}>Media</Select.Option>
                            <Select.Option value={3}>Baja</Select.Option>
                        </Select>
                    </Form.Item >
                    <Form.Item label="Fecha" rules={rules} name="date">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item label="Descripción" rules={rules} name="description">
                        <TextArea autoSize={{ minRows: 3, maxRows: 8 }} allowClear={true} />
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <Attachments />
                    </Form.Item>
                    <Row justify="end">
                        <Form.Item style={{ paddingRight: "1%" }}>
                            <Button htmlType="reset">
                                Borrar campos
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" loading={uploading} htmlType="submit">
                                Crear
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
