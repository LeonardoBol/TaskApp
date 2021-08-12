import {
    Modal, Row, Col,
    Button, Tag, Divider,
    Form, Input, Select,
    DatePicker, message, Tooltip
} from 'antd';
import { useState } from 'react';
import Attachments from 'components/tasks-components/attachments';
import { getTasksList, updateTask } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';



const ModalTaskEditView = ({ visible, hide, data }) => {

    //task
    const [task, setTask] = useState(data);
    const id = task.id;

    //--------------------------------------
    const { RangePicker } = DatePicker
    const dateFormat = 'YYYY/MM/DD';
    const { TextArea } = Input
    const fecha = [moment(data.start_date.substring(0, 10), dateFormat),
                    moment(data.end_date.substring(0, 10), dateFormat)];
    const { uploading } = useSelector(state => state.tasksReducer);
    const rules = [{ required: true, message: 'Campo Vacio', }]
    const dispatch = useDispatch();
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
            user: parseInt(values.user, 10)
        }
        const temporalTask = { ...values, ...convertValues, id }
        delete temporalTask.date;
        console.log(temporalTask);

        dispatch(updateTask(temporalTask));

        setTimeout(() => {
            dispatch(getTasksList())
        }, 1000);

        Modal.success({
            title: 'Actualización exitosa',
            content: 'Se ha actualizado la tarea correctamente',
            onOk() { }
        });
    }

    return (
        <Modal
            title={`Editar tarea: ${task.id}`}
            centered
            visible={visible}
            width={600}
            onCancel={hide()}
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
            >
                <Form.Item label="Proyecto" rules={rules} name="project"
                    initialValue={task.project}>
                    <Input />
                </Form.Item>
                <Form.Item label="Nombre Tarea" rules={rules} name="subject" initialValue={task.subject}>
                    <Input />
                </Form.Item>
                <Form.Item label="Responsable" rules={rules} name="user"
                        initialValue={1}>
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