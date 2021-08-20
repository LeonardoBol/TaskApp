import React, { useEffect, useState } from 'react'
import {
    Modal, Row, Col,
    Button, Divider,
    Form, Input, Select,
    DatePicker, Upload
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    createTask, getAttachment, getTasksList,
    uploadAttachment, postFilteredTasks
} from 'redux/actions';


export default function ModalCreateTask({ visible, hide }) {

    // ---------------UTILS--------------
    const { RangePicker } = DatePicker
    const { TextArea } = Input
    const rules = [{ required: true, message: 'Campo Vacio', }]
    const dispatch = useDispatch();
    const { uploading, tasks } = useSelector(state => state.tasksReducer);
    const { users, id_auth_user } = useSelector(state => state.usersReducer);

    // Traer lista de usuarios para seleccionar en el form
    const userlist = () => {
        const list = [];
        users.map(v => {
            list.push(
                <Select.Option key={v.id} value={v.id} >{v.name}</Select.Option>
            )
        })
        return list;
    }

    // Funcion - prevenir accion post por defecto de upload
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    const onSubmit = (values) => {

        // Manejo de los archivos adjuntos
        const AttachmentUpload = new FormData();
        if (values.attachments !== undefined) {
            // Cargar varios adjuntos a la vez
            for (let i = 0; i < values.attachments.fileList.length; i++)
                AttachmentUpload.append('file', values.attachments.fileList[i].originFileObj);
            console.log(AttachmentUpload);
        }
        dispatch(uploadAttachment(AttachmentUpload))

        //Parseo de fechas
        const convertValues = {
            start_date: values.date[0].toISOString().substring(0, 10),
            end_date: values.date[1].toISOString().substring(0, 10),
            user: parseInt(values.user, 10),
        }

        // Actualización de la tarea
        const created_by = { created_by: id_auth_user };
        const task = { ...values, ...convertValues, ...created_by }
        delete task.date;
        const id = { id_auth_user: id_auth_user };
        dispatch(createTask(task));

        /*let tasksMandar = [];

        // VARIABLE PARA EL MANEJO DE LAS TAREAS QUE SE 
            // ESTÁN MOSTRANDO (FILTROS)
            for (let i = 0; i = tasksMandar.length; i++) {
                tasksMandar.pop();
            }
            for (let i = 0; i < tasks.length; i++) {
                tasksMandar.push(tasks[i]);
            }
            dispatch(postFilteredTasks(tasksMandar))*/

        setTimeout(() => {
            dispatch(getAttachment())
            dispatch(getTasksList(id))
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
                destroyOnClose={true}
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
                    <Row>
                        <font
                            color="#3B444F"
                            size="3">
                            Adjuntar archivos
                        </font>
                    </Row>
                    <Form.Item name='attachments' valuePropName='file' required={false} >
                        <Upload customRequest={dummyRequest} maxCount={5} multiple>
                            <Button loading={false} icon={<UploadOutlined />}>Subir</Button>
                        </Upload>
                    </Form.Item>
                    <Divider />
                    <Row justify="end">
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
