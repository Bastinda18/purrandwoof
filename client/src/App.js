import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import CreatePet from './components/pet-forms/CreatePet';
import Pets from './components/pets/Pets';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Router>
			<Fragment>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<Alert />
				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/create-profile' component={CreateProfile} />
					<PrivateRoute exact path='/edit-profile' component={EditProfile} />
					<PrivateRoute exact path='/create-pet' component={CreatePet} />
					<PrivateRoute exact path='/all-pets' component={Pets} />
				</Switch>
			</Fragment>
		</Router>
	);
};

export default App;
