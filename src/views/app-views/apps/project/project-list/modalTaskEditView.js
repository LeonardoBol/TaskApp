import {
    Modal, Row, Col,
    Button, Tag, Divider,
    Form, Input, Select,
    DatePicker, Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import {
    deleteAttachment,
    getAttachment,
    getTasksList,
    updateTask,
    uploadAttachment
} from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';



const ModalTaskEditView = ({ visible, hide, data, defaultFileList }) => {

    //task
    const [task, setTask] = useState(data);
    const id = task.id;

    //--------UTILS---------------------
    const { RangePicker } = DatePicker
    const dateFormat = 'YYYY/MM/DD';
    const { TextArea } = Input
    const fecha = [moment(data.start_date.substring(0, 10), dateFormat),
    moment(data.end_date.substring(0, 10), dateFormat)];
    const { uploading } = useSelector(state => state.tasksReducer);
    const rules = [{ required: true, message: 'Campo Vacio', }]
    const dispatch = useDispatch();
    const { users, id_auth_user } = useSelector(state => state.usersReducer);

    const pruebaImg = [{
        uid: '23',
        name: 'Algo.jpg',
        url: 'http://localhost:5000/uploads/file-1629135574879.jpg'
    }]

    // Funcion - organizar los adjuntos que llegan
    const datosIniciales = [];
    const llenarDatosIniciales = () => {
        if (defaultFileList.length !== 0) {
            for (let i = 0; i < defaultFileList.length; i++) {
                datosIniciales.push({
                    uid: defaultFileList[i].id,
                    name: defaultFileList[i].originalname,
                    url: defaultFileList[i].file
                })
                console.log(datosIniciales);
            }
        }
        return datosIniciales;
    }
    llenarDatosIniciales();

    // Funcion - prevenir accion post por defecto de upload
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }
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

    // Función actualizar
    const onSubmit = (values) => {

        // Manejo de los archivos adjuntos
        const AttachmentUpload = new FormData();
        if (values.attachments !== undefined) {
            // Cargar varios adjuntos a la vez
            for (let i = 0; i < values.attachments.fileList.length; i++)
                AttachmentUpload.append('file', values.attachments.fileList[i].originFileObj);
            console.log(AttachmentUpload);
        }
        AttachmentUpload.append('text', task.id);
        dispatch(uploadAttachment(AttachmentUpload));

        //Parseo de fechas
        const convertValues = {
            start_date: values.date[0].toISOString().substring(0, 10),
            end_date: values.date[1].toISOString().substring(0, 10),
            user: parseInt(values.user, 10)
        }
        const temporalTask = { ...values, ...convertValues, id };

        // Eliminación de tados innecesarios del form
        delete temporalTask.date;
        delete temporalTask.attachments;

        // Actualización de la tarea
        dispatch(updateTask(temporalTask));
        const id_auth = { id_auth_user: id_auth_user };
        console.log(uploading);
        setTimeout(() => {
            dispatch(getAttachment())
            dispatch(getTasksList(id_auth))
        }, 2000);

        Modal.success({
            title: 'Actualización exitosa',
            content: 'Se ha actualizado la tarea correctamente',
            onOk() { }
        });
    }

    // FUNCION PARA ELIMINAR DE LA BASE DE DATOS EL ARCHIVO EN CUESTIÓN
    const eliminarArchivo = e => {
        let idEliminar = {
            id: e.uid
        }

        dispatch(deleteAttachment(idEliminar));
        setTimeout(() => {
            dispatch(getAttachment())
        }, 2000);        
    }

    return (
        <Modal
            title={`Editar tarea`}
            centered
            visible={visible}
            width={600}
            onCancel={hide()}
            destroyOnClose={true}
            footer={[
                <Button key="return" onClick={hide()}>
                    Volver
                </Button>,
            ]}
        >
            <Form
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 100,
                }}
                layout="horizontal"
                onFinish={onSubmit}
                size='small'
                name='Form'
            >
                <Form.Item label="Proyecto" rules={rules} name="project"
                    initialValue={task.project}>
                    <Input />
                </Form.Item>
                <Form.Item label="Nombre Tarea" rules={rules} name="subject" initialValue={task.subject}>
                    <Input />
                </Form.Item>
                <Form.Item label="Responsable" rules={rules} name="user"
                    initialValue={task.users_id}>
                    <Select>
                        {userlist()}
                    </Select>
                </Form.Item>
                <Form.Item label="Estado" rules={rules} name="status" initialValue={task.status_id}>
                    <Select>
                        <Select.Option value={1} >Nuevo</Select.Option>
                        <Select.Option value={2}>Pendiente</Select.Option>
                        <Select.Option value={3}>Resuelto</Select.Option>
                        <Select.Option value={4}>Cerrado</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Prioridad" rules={rules} name="priority" initialValue={task.priority_id}>
                    <Select>
                        <Select.Option value={1}>Alta</Select.Option>
                        <Select.Option value={2}>Media</Select.Option>
                        <Select.Option value={3}>Baja</Select.Option>
                    </Select>
                </Form.Item >
                <Form.Item label="Fecha" name="date" initialValue={fecha} >
                    <RangePicker
                        format={dateFormat} />
                </Form.Item>
                <Form.Item label="Descripción" rules={rules} name="description" initialValue={task.description}>
                    <TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
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
                    <Upload
                        customRequest={dummyRequest}
                        maxCount={5}
                        multiple
                        defaultFileList={datosIniciales}
                        onRemove={eliminarArchivo}
                    >
                        <Button loading={false} icon={<UploadOutlined />}>Subir</Button>
                    </Upload>
                </Form.Item>
                <Divider />
                <Row justify="end">
                    <Form.Item >
                        <Button type="primary" htmlType="submit" loading={uploading} >
                            Actualizar
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalTaskEditView;