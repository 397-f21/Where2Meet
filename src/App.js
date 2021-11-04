import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyGoogleMap from './components/MyGoogleMap';

function App() {
    return (
        <div className="App">
            <header className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-4 col-sm-12">
                            <img className="logo"
                                 src="https://firebasestorage.googleapis.com/v0/b/cloud-walker-c72ce.appspot.com/o/logos%2Fw2m-2.jpeg?alt=media&token=d12b2202-969d-43b4-9d48-00d8c48f0a3d"
                                 alt="new"/>
                        </div>
                    </div>
                </div>
            </header>
            <div className="main-wrapper">
                <MyGoogleMap/>
            </div>
        </div>
    );
}

export default App;
