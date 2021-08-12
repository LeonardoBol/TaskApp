import { Modal, Row, Col, Button, Tag, Divider } from 'antd';
import Attachments from 'components/tasks-components/attachments';
import Comments from 'components/tasks-components/comments';

const priorityTags = priority => {
    let color = 'geekblue';
    let text = 'None';
    switch (priority) {

        case 1:
            color = 'red'
            text = 'ALTA'
            break;
        case 2:
            color = 'yellow'
            text = 'MEDIA'
            break;
        case 3:
            color = 'cyan'
            text = 'BAJA'
            break;
    }
    return (
        <Tag color={color} key={text}>
            {text}
        </Tag>
    )
}
const statusTags = status => {
    let color = 'geekblue';
    let text = 'None';
    switch (status) {
        case 1:
            color = 'green'
            text = 'NUEVA'
            break;
        case 2:
            color = 'yellow'
            text = 'PENDIENTE'
            break;
        case 3:
            color = 'blue'
            text = 'RESUELTA'
            break;
        case 4:
            color = 'volcano'
            text = 'CERRADA'
            break;
    }
    return (
        <Tag color={color} key={text}>
            {text}
        </Tag>
    )
}

const ModalTaskView = ({ visible, hide, data }) => {

    return (
        <>
            <Modal
                
                centered
                visible={visible}
                width={600}
                onCancel={hide()}
                footer={[
                    <Button key="back" onClick={hide()}>
                        Volver
                    </Button>,
                ]}
            >
                <Row>
                    <font
                        color="#A9A9A9"
                        size="4"
                    >
                        ID: {data.id}
                    </font>

                </Row>
                <Divider />
                <Row>
                    <Col xs={8} sm={8} md={9}>
                        <Row>
                            <h4>Proyecto:</h4>
                        </Row>
                        <Row>
                            <h4>Nombre Tarea:</h4>
                        </Row>
                        <Row>
                            <h4>Responsable:</h4>
                        </Row>
                        <Row>
                            <h4>Fecha Inicial: </h4>
                        </Row>
                        <Row>
                            <h4>Fecha Final: </h4>
                        </Row>
                        <Row>
                            <h4>Estado:  </h4>
                        </Row>
                        <Row>
                            <h4>Prioridad: </h4>
                        </Row>


                    </Col>
                    <Col>

                        <Row>
                            <h4>{data.project}</h4>
                        </Row>
                        <Row>
                            <h4>{data.subject}</h4>
                        </Row>
                        <Row>
                            <h4>{data.users_id}</h4>
                        </Row>
                        <Row>
                            <h4>{data.start_date.substring(0, 10)}</h4>
                        </Row>
                        <Row>
                            <h4>{data.end_date.substring(0, 10)}</h4>
                        </Row>
                        <Row>
                            <h5>{statusTags(data.status_id)}</h5>
                        </Row>
                        <Row>
                            <h5>{priorityTags(data.priority_id)}</h5>
                        </Row>

                    </Col>
                    <Divider />

                </Row>
                <Row>
                    <h4>Descripción:</h4>
                </Row>
                <Row>
                    <p>{data.description}</p>
                </Row>
            </Modal>
        </>
    )
}

export default ModalTaskView;