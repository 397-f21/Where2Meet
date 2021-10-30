import React, { useState, useCallback, useEffect } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyGoogleMap from './components/MyGoogleMap';
import { Marker2 } from './components/Markers';

function App() {


    return (
        <div className="App">
            <header class="jumbotron">
                <div class="container">
                    <div class="row row-header">
                        <div class="col-md-4 col-sm-12">
                            <img class="logo"
                                src="https://firebasestorage.googleapis.com/v0/b/cloud-walker-c72ce.appspot.com/o/logos%2Fw2m-2.jpeg?alt=media&token=d12b2202-969d-43b4-9d48-00d8c48f0a3d"
                                alt="new"></img>
                        </div>
                    </div>
                </div>
            </header>
            <div className="main-wrapper">
                <MyGoogleMap />

                <Marker2 data-testid="meetMarker"
                text={"PLACEHOLDER"}
                lat={10}
                lng={10}
                />
            </div>
        </div>
    );
}

export default App;
