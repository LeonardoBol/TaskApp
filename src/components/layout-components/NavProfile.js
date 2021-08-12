import React, { useState, useLayoutEffect, useEffect } from 'react'
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from 'react-redux'
import { 
  EditOutlined, 
  SettingOutlined, 
  ShopOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import { getAuthUser } from 'redux/actions/Users';
import { useDispatch, useSelector } from 'react-redux'


const menuItem = [
	{
		title: "Editar Perfil",
		icon: EditOutlined ,
		path: "/"
    },
    
    {
		title: "Configuracion de Cuenta",
		icon: SettingOutlined,
		path: "/"
    }
]

//Trae el usuario
const userNameSplitted = (auth_user) =>
{
  let username = auth_user;
  

  if(username != null)
  {
    let splitted_auth_user = username.split(" ");

    if(splitted_auth_user[0] != null)//Primer Nombre
    {
      username = splitted_auth_user[0];
    }

    if(splitted_auth_user[1] != null) //Segundo Nombre o Primer Apellido
    {
      username += " "+splitted_auth_user[1];
    }

  }
  else
  {
    username = "Invitado";
  }
  return username;
}

export const NavProfile = ({signOut,getAuthUser}) => {
  
  const [init, setInit] = useState(false);
  const { auth_user } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();


  console.log(auth_user);

	useLayoutEffect(() => {
		if (!init) {
			setInit(true);
			dispatch(getAuthUser());
		}
	}, [auth_user])

  //const profileImg = "/img/avatars/thumb-1.jpg";
  const profileImg = "/img/avatars/generic_user.png";

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">{userNameSplitted(auth_user)}</h4>
            <span className="text-muted">{/*Desarrollador*/}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Cerrar Sesión</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut,getAuthUser})(NavProfile)
