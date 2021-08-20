import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ProjectList from './project-list/ProjectList';

const Project = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/list`} component={ProjectList} />
		</Switch>
	)
}

export default Project
