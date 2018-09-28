import React, { Component } from 'react';
import Fcoin from 'fcoin-api';
import logo from './logo.svg';
import './App.css';
import { FcoinWebSocket, FcoinApi } from 'fcoin-nodejs-api';

import Child from "./child/child"

class App extends Component {

	fcoin = null;
	ws = null;
	api = null;

	constructor() {
		super();
		this.state = {
			squares: Array(9).fill(null),
		};
		// this.fcoin = new Fcoin({
		// 	key: '2a8af4672591498380151e5487766f97',
		// 	secret: '98349ea4a22e44d09d9010c8fc5d047e'
		// });

		this.ws = new FcoinWebSocket();
		this.api = new FcoinApi('2a8af4672591498380151e5487766f97', '98349ea4a22e44d09d9010c8fc5d047e');
		this.getList();
	}

	getList() {
		let list = [];
		// this.fcoin.getTicker('ethusdt').then(data => {
		// 	list = data;
		// 	console.log(data);
		// });
		// this.fcoin.getBalance().then(data => {
		// 	console.log(data);
		// });




		this.ws.OnTicker('ftusdt', (data) => {
			console.log(data);
		});

		this.api.FetchBalance().then(console.log);
	}

  render() {


		return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
				<ul>
					<li ></li>
				</ul>
				<Child></Child>
      </div>
    );
  }
}

export default App;
