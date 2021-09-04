import React, { useState, useLayoutEffect, useEffect } from 'react'
import ReactExport from "react-data-export";

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Filter from 'components/tasks-components/Filter';
import {
	Radio,
	Button, Row,
	Col, Tooltip,
	Tag, Modal,
	Menu, Card
} from 'antd';
import {
	AppstoreOutlined,
	UnorderedListOutlined,
	PlusOutlined,
	ExclamationCircleOutlined,
	FileExcelTwoTone
} from '@ant-design/icons';
import {
	PaperClipOutlined,
	ClockCircleOutlined,
	EyeOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import ModalTaskView from './modalTaskView';
import ModalTaskEditView from './modalTaskEditView';
import ModalCreateTask from './modalCreateTask';
import { getTasksList, getListUser, deleteTask, updateStatusTask, getAttachment, refreshStatusTask } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import 'assets/less/styles/tasks.css'
import 'assets/less/styles/btn.css'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';


//		MÁS OPCIONES (VER, EDITAR, ELIMINAR)
const ItemAction = ({ id, dataTask, removeId }) => {

	const { attachments } = useSelector(state => state.attachmentsReducer);

	//ModalTaskView 
	const [visibleMTV, setVisibleMTV] = useState(false);
	const onViewMTV = () => { setVisibleMTV(!visibleMTV) }

	//ModalTaskEditView
	const [visibleMEV, setVisibleMEV] = useState(false);
	const onViewMEV = () => { setVisibleMEV(!visibleMEV) }

	const dispatch = useDispatch()
	const { id_auth_user } = useSelector(state => state.usersReducer);
	const id_auth = { id_auth_user: id_auth_user };

	const idSend = { id: dataTask.id }

	//------- LISTA INICIAL DE ARCHIVOS ADJUNTOS -------
	let archivos = [];
	const archivosIniciales = () => {

		attachments.map(elm => (
			elm.tasks_id === dataTask.id ? archivos.push(elm) : ''
		))
		return archivos;
	}
	archivosIniciales();

	//----------------------------
	const DeleteTaskData = () => {

		Modal.confirm({
			title: 'Eliminar tarea',
			icon: <ExclamationCircleOutlined />,
			content: '¿Está seguro que desea eliminar esta tarea?',
			okText: 'Si',
			cancelText: 'No',
			onOk: () => {
				dispatch(deleteTask(idSend));
				setTimeout(() => {
					dispatch(getTasksList(id_auth));
				}, 600);

				Modal.success({
					title: 'Eliminación exitosa',
					content: 'Se ha eliminado el usuario correctamente',
					onOk() { }
				});
			}
		});


	}

	return (
		<EllipsisDropdown
			menu={
				<Menu>
					<ModalTaskView visible={visibleMTV} hide={() => onViewMTV} data={dataTask} defaultFileList={archivos} />
					<ModalTaskEditView visible={visibleMEV} hide={() => onViewMEV} data={dataTask} defaultFileList={archivos} />
					<Menu.Item key="0" onClick={() => onViewMTV()}>
						<EyeOutlined />
						<span>Ver</span>
					</Menu.Item>
					<Menu.Item key="1" onClick={() => onViewMEV()} >
						<EditOutlined />
						<span>Editar</span>
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key="2" onClick={() => DeleteTaskData()} >
						<DeleteOutlined />
						<span>Eliminar tarea</span>
					</Menu.Item>

				</Menu>
			}
		/>
	)
}

//		MOSTRAR NOMBRE Y ASUNTO ///////////////////////////
const ItemHeader = ({ name, category }) => (
	<div>
		<h4 className="mb-0">{name}</h4>
		<span className="text-muted">{category}</span>
	</div>
)

//		MOSTRAR CANTIDAD DE ADJUNTOS DE LA TAREA
//		MOSTRAR DIAS RESTANTES PARA ACABAR EL PLAZO
const ItemInfo = ({ statusColor, dayleft, priority, status, data }) => {

	const { attachments } = useSelector(state => state.attachmentsReducer);

	let cantidad = 0;

	// CALCULAR LA CANTIDAD DE ARCHIVOS ADJUNTOS TIENE CADA TAREA
	const calcularCantidad = () => {

		attachments.map(elm => (
			elm.tasks_id === data.id ? cantidad++ : ''
		))
		return cantidad;
	}
	calcularCantidad();
	//-------------

	return (

		<Flex alignItems="center">
			<div className="mr-3">
				<Tooltip title="Attachment">
					<PaperClipOutlined className="text-muted font-size-md" />
					<span className="ml-1 text-muted">{cantidad}</span>
				</Tooltip>
			</div>
			<div>
				<Tag className={statusColor === "none" ? 'bg-gray-lightest' : ''} color={statusColor !== "none" ? statusColor : ''}>
					<ClockCircleOutlined />
					<span className="ml-2 font-weight-semibold">{dayleft}</span>
				</Tag>
				<Tag color={priority.colorPriority} > {'Prioridad: ' + priority.priority} </Tag>
				<Tag color={status.colorEstado} > {'Estado: ' + status.estado} </Tag>
			</div>
		</Flex>
	)
}

const CheckBox = ({ data }) => {

	const [checked, setChecked] = useState(data.status_id == 3 ? true : false)
	const dispatch = useDispatch()

	const { id_auth_user } = useSelector(state => state.usersReducer);
	const { tasksFiltered } = useSelector(state => state.tasksReducer)
	const id_auth = { id_auth_user: id_auth_user };


	const changeStatus = (e) => {
		e.preventDefault();
		setChecked(() => !checked)
		let estado = data.status_id

		estado == 3 ? estado = 2 : estado = 3

		const datos = {
			id: data.id,
			status: estado
		}
		dispatch(updateStatusTask(datos))
		//-------------------------
		let indexTask = 0;
		indexTask = tasksFiltered.findIndex(e => e.id == data.id)

		let arr = [...tasksFiltered]

		arr[indexTask] = { ...arr[indexTask], status_id: estado };
		console.log("------------------------------->", arr[indexTask])

		console.log('TaskChanged', arr);

		dispatch(refreshStatusTask(arr));

		//-------------------------

		Modal.success({
			title: 'Estado actualizado',
			content: 'Se ha actualizado el estado de la tarea',
			onOk() { }
		});
	}

	return (
		<div>
			<label className="checkButton"  >
				<input type="checkbox" id="checkbox" onChange={(e) => changeStatus(e)} checked={checked}></input>
				<span className="checkmark"></span>
			</label>
		</div>
	)
}

const sustraerFecha = (cadena) => {

	const fechaFin = cadena.substring(0, 10);
	const cadenaDate = new Date().toISOString();
	const fechaActual = cadenaDate.substring(0, 10)

	const date1 = new Date(fechaFin);
	const date2 = new Date(fechaActual);

	if (date1 < date2) {
		return 'Tiempo vencido'
	} else if (date1 > date2) {
		return date1.getDate() - date2.getDate() + ' dias restantes';
	} else {
		return 'Vence hoy'
	}
}

const sustraerPrioridad = (prioridad) => {
	let priority = '';
	let colorPriority = 'string';


	switch (prioridad) {
		case 1:
			priority = 'Alta'
			colorPriority = 'red'
			break;
		default:
			break;
	}

	if (prioridad == '1') {
		priority = 'Alta'
		colorPriority = 'red'

	} else if (prioridad == '2') {
		priority = 'Media'
		colorPriority = 'yellow'

	} else if (prioridad == '3') {
		priority = 'Baja'
		colorPriority = 'cyan'
	}

	return {
		priority,
		colorPriority
	}
}

const sustraerEstado = (status) => {

	let estado = '';
	let colorEstado = 'string';


	if (status == '1') {
		estado = 'Nuevo'
		colorEstado = 'cyan'

	} else if (status == '2') {
		estado = 'Pendiente'
		colorEstado = 'yellow'

	} else if (status == '3') {
		estado = 'Resuelto'
		colorEstado = 'green'
	}
	else if (status == '4') {
		estado = 'Cerrado'
		colorEstado = 'red'
	}

	return {
		estado,
		colorEstado
	}
}

//		FUNCION EXPORTAR A EXCEL

const ExcelExport = ({ data }) => (
	<div>
		<ExcelFile element={<Button className='excelButton'  > <FileExcelTwoTone style={{ fontSize: '23px', color: '#32CA2B' }} /> </Button>} filename={'Tareas'} >
			<ExcelSheet data={data} name="Lista de tareas" >
				<ExcelColumn label="Id" value="id" />
				<ExcelColumn label="Id Usuario" value="users_id" />
				<ExcelColumn label="Proyecto" value="project" />
				<ExcelColumn label="Objetivo" value="subject" />
				<ExcelColumn label="Fecha Inicial" value="start_date" />
				<ExcelColumn label="Fecha Final" value="end_date" />
				<ExcelColumn label="Descripción" value="description" />
				<ExcelColumn label="Prioridad" value="priority_id" />
				<ExcelColumn label="Estado" value="status_id" />
				<ExcelColumn label="Descripción" value="description" />
			</ExcelSheet>
		</ExcelFile>
	</div>
)


//		LISTAR EN FORMA DE LISTA ////////////////////////////////////

const ListItem = ({ data, removeId }) => {
	return (
		<div className="bg-white rounded p-3 mb-3 border">
			<Row align="middle">
				<Col xs={16} sm={24} md={5}>
					<ItemHeader name={data.project} category={data.subject} />
				</Col>

				<Col xs={14} sm={16} md={14}>
					<ItemInfo
						dayleft={sustraerFecha(data.end_date)}
						priority={sustraerPrioridad(data.priority_id)}
						status={sustraerEstado(data.status_id)}
						data={data}
					/>
				</Col>
				<Col xs={4} sm={5} md={2}>
					<CheckBox data={data} />
				</Col>

				<Col xs={4} sm={2} md={2}>
					<div className="text-right">
						<ItemAction dataTask={data} id={data.id} removeId={removeId} />

					</div>
				</Col>
			</Row>
		</div>
	)
}

//		LISTAR EN FORMA DE TARJETAS ////////////////////////////
const GridItem = ({ data, removeId }) => (
	<Card>
		<Row>
			<Col flex={5} >
				<ItemHeader name={data.project} category={data.subject} />
			</Col>
			<Col flex={1}>
				<Row justify={'end'}>
					<ItemAction id={data.id} dataTask={data} removeId={removeId} />
				</Row>
			</Col>
		</Row>
		<Row>
			<Col >
				<Row>
					<div className="mt-3">
						<ItemInfo
							dayleft={sustraerFecha(data.end_date)}
							priority={sustraerPrioridad(data.priority_id)}
							status={sustraerEstado(data.status_id)}
							data={data}
						/>
					</div>
				</Row>
				<Row justify={'end'}>
					<div className="mt-3">
						<CheckBox data={data} />
					</div>
				</Row>
			</Col>
		</Row>
	</Card>
)

// -------------------------------- ****** ---------------------------------------
///////////////////////////FUNCION PRINCIPAL DE LISTAR////////////////////////////
//--------------------------------- ****** ---------------------------------------

const ProjectList = () => {

	//------ REDUCER ---------------------
	const [init, setInit] = useState(false);
	const { loading, tasks, tasksFiltered } = useSelector(state => state.tasksReducer);
	const { id_auth_user } = useSelector(state => state.usersReducer);

	const dispatch = useDispatch();

	const id = { id_auth_user: id_auth_user };


	useLayoutEffect(() => {
		if (!init) {
			setInit(true);
			dispatch(getAttachment())
			dispatch(getTasksList(id))
			dispatch(getListUser())
		}
	}, [init, tasks, dispatch])
	//-------------------------------------

	// TIPO DE VISTA USADA
	const [view, setView] = useState(VIEW_GRID);

	// MANEJADOR PARA CAMBIO DE VISTA
	const onChangeProjectView = e => {
		setView(e.target.value)
	}

	const TraerDatos = (e) => {
		tasks = e;
	}

	const paintCards = () => {

		return (

			view === VIEW_LIST ?
				tasksFiltered.map(elm => <ListItem data={elm} removeId={TraerDatos} key={elm.id} />)
				:
				<Row gutter={16}>
					{tasksFiltered.map(elm => (
						<Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
							<GridItem data={elm} removeId={TraerDatos} />
						</Col>
					))}
				</Row>
		)
	}

	const [visible, setVisible] = useState(false);
	const onView = () => { setVisible(!visible) }
	return (
		<>
			<ModalCreateTask visible={visible} hide={() => onView} />
			<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="between" alignItems="center" className="py-4">
						<h2>Tareas</h2>
						<div>
							<Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeProjectView(e)}>
								<Radio.Button value={VIEW_GRID}><AppstoreOutlined /></Radio.Button>
								<Radio.Button value={VIEW_LIST}><UnorderedListOutlined /></Radio.Button>
							</Radio.Group>
							<Button type="primary" className="ml-2" onClick={() => onView()}>
								<PlusOutlined />
								<span>Nueva</span>
							</Button>
						</div>
					</Flex>
				</div>
			</PageHeaderAlt>

			<Filter />

			{loading ? '' :
				<ExcelExport data={tasksFiltered} />
			}

			<div className={`my-4 ${view === VIEW_LIST ? 'container' : 'container-fluid'}`}>
				{tasksFiltered === undefined ? '' : (loading ? '' : paintCards())}
			</div>
		</>
	)
}

export default ProjectList;