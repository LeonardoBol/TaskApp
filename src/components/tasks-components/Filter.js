import React, { useEffect } from 'react'
import {
    Input, Select,
    Button, Row,
    Col
} from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { postFilteredTasks } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch();

    const { tasks } = useSelector(state => state.tasksReducer);
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


    let tasksMandar = [];

    useEffect(() => {

        for (let i = 0; i = tasksMandar.length; i++) {
            tasksMandar.pop();
        }

        for (let i = 0; i < tasks.length; i++) {
            tasksMandar.push(tasks[i]);
        }

        console.log(tasksMandar);
        dispatch(postFilteredTasks(tasksMandar))

    }, [tasks])

    for (let i = 0; i < tasks.length; i++) {
        tasksMandar.push(tasks[i]);
    }


    const resetVariable = () => {

        for (let i = 0; i = tasksMandar.length; i++) {
            tasksMandar.pop();
        }

        for (let i = 0; i < tasks.length; i++) {
            tasksMandar.push(tasks[i]);
        }

        console.log(tasksMandar);
        dispatch(postFilteredTasks(tasksMandar))
        return tasksMandar;
    }


    //---------------------- STATUS -----------------------------------------------
    let status = 0;

    const handleClickStatus = () => {
        for (let i = 0; i = tasksMandar.length; i++) {
            tasksMandar.pop();
        }
        tasks.filter(n => n.status_id == status).map(m => tasksMandar.push(m));
        console.log(tasksMandar);
        dispatch(postFilteredTasks(tasksMandar))
        return tasksMandar;
    }

    const handleChangeStatus = (value) => {
        status = value;
    }

    //---------------------- PRIORITY ---------------------------------------------
    let priority = 0;

    const handleClickPriority = () => {
        for (let i = 0; i = tasksMandar.length; i++) {
            tasksMandar.pop();
        }
        tasks.filter(n => n.priority_id == priority).map(m => tasksMandar.push(m));
        console.log(tasksMandar);
        dispatch(postFilteredTasks(tasksMandar))
        return tasksMandar;
    }
    const handleChangePriority = (value) => {
        priority = value;
    }
    //------------------------ USUARIO -------------------------------------------

    let user = 0;
    const handleClickUser = () => {
        for (let i = 0; i = tasksMandar.length; i++) {
            tasksMandar.pop();
        }
        tasks.filter(n => n.users_id == user).map(m => tasksMandar.push(m));
        console.log(tasksMandar);
        dispatch(postFilteredTasks(tasksMandar))
        return tasksMandar;
    }
    const handleChangeUser = (value) => {
        console.log('Este es el value de user', value);
        user = value;
    }


    return (

        <Row className='filterField' >
            <Col flex={1}>
                <Select placeholder={'Estado'} onChange={(e) => handleChangeStatus(e)}>
                    <Select.Option value={1} >Nuevo</Select.Option>
                    <Select.Option value={2}>Pendiente</Select.Option>
                    <Select.Option value={3}>Resuelto</Select.Option>
                    <Select.Option value={4}>Cerrado</Select.Option>
                </Select>

                <Button size={'small'} type="ghost" htmlType="submit" onClick={handleClickStatus} >
                    <SearchOutlined />
                </Button>
            </Col>
            <Col flex={1}>
                <Select placeholder={'Prioridad'} onChange={(e) => handleChangePriority(e)}>
                    <Select.Option value={1} >Alta</Select.Option>
                    <Select.Option value={2}>Media</Select.Option>
                    <Select.Option value={3}>Baja</Select.Option>

                </Select>

                <Button size={'small'} type="ghost" htmlType="submit" onClick={handleClickPriority} >
                    <SearchOutlined />
                </Button>
            </Col>
            <Col flex={1}>
                <Select
                    style={{ width: '200px' }}
                    placeholder={'Responsable'}
                    onChange={(e) => handleChangeUser(e)}
                >
                    {userlist()}
                </Select>

                <Button size={'small'} type="ghost" htmlType="submit" onClick={handleClickUser} >
                    <SearchOutlined />
                </Button>
            </Col>
            <Col flex={15}>
                <Button size={'small'} type="primary" onClick={() => resetVariable()} >
                    <RedoOutlined />
                </Button>
            </Col>

        </Row>
    )
}

export default Filter;