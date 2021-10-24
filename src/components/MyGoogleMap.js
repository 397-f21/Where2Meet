// MyGoogleMaps.js
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import GoogleMapReact from 'google-map-react';
import {fitBounds} from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import {Marker, Marker2} from './Markers';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export class MyGoogleMap extends Component {


    state = {
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        center: [],
        zoom: 9,
        draggable: true,
        places: [],
        meet_loc_lat: null,
        meet_loc_lng: null,
        meet_address: null

    };

    componentWillMount() {
        this.setCurrentLocation();
    }


    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({draggable: true});
        this._generateAddress();
    }

    _onChange = ({center, zoom}) => {
        console.log("center:", center);
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    rad2degr(rad) {
        return rad * 180 / Math.PI;
    }

    degr2rad(degr) {
        return degr * Math.PI / 180;
    }

    getLatLngCenter() { //latLngInDegr) {
        var places_length = this.state.places.length
        var sumX = 0;
        var sumY = 0;
        var sumZ = 0;


        for (var i = 0; i < places_length; i++) {
            var lat = this.degr2rad(this.state.places[i].lat);
            var lng = this.degr2rad(this.state.places[i].lng);
            // sum of cartesian coordinates
            sumX += Math.cos(lat) * Math.cos(lng);
            sumY += Math.cos(lat) * Math.sin(lng);
            sumZ += Math.sin(lat);
        }

        var avgX = sumX / places_length;
        var avgY = sumY / places_length;
        var avgZ = sumZ / places_length;

        // convert average x, y, z coordinate to latitude and longtitude
        var lng = Math.atan2(avgY, avgX);
        var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
        var lat = Math.atan2(avgZ, hyp);

        return [this.rad2degr(lat), this.rad2degr(lng)];
    }


    _onClick = (value) => {
        this.setState({
            lat: value.lat,
            lng: value.lng
        });
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this._generateAddress();
    };

    addPlace = (place) => {


        this._generateAddress(place);


    };

    _generateAddress(place) {
        const {
            mapApi
        } = this.state;

        if (!place) {
            return;
        }

        const geocoder = new mapApi.Geocoder;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        geocoder.geocode({'location': {lat: lat, lng: lng}}, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    const newPlace =
                        {
                            place: place,
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            address: results[0].formatted_address
                        }
                    this.setState(prevState => ({
                        places: [...prevState.places, newPlace]
                    }));
                    console.log("places:", this.state.places);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });

    }

    // Get Current Location Coordinates
    setCurrentLocation() {

        this.setState({
            center: [42.0494669, -87.688195],
            lat: 42.0494669,
            lng: -87.688195
        })
    }

    addressRenderer() {
        return (
            <> 
                {this.state.places.map((place, ind) => (
                    <div class="card-text">Person {ind + 1}: <span>{place.address}</span></div>
                ))}
            </>
        )
    }

    markerRenderer() {
        return (
            this.state.places.map((place, ind) => (
                <Marker
                    text={place.address}
                    lat={place.lat}
                    lng={place.lng}
                />
            ))
        )
    }

    CalculateCenter = () => {
        return (
            <>
                <button className="btn btn-outline-secondary btn-sm m-3"
                        onClick={() => {
                            const coords = this.getLatLngCenter()
                            this.generateAddressForCenter();
                            this.setState({
                                meet_loc_lat: coords[0],
                                meet_loc_lng: coords[1],
                                center: {"lat": coords[0], "lng": coords[1]},
                                meet_address: this.generateAddressForCenter(coords[0], coords[1])

                            });
                            console.log(this.state.meet_address);
                        }}>

                    Calculate Meeting Location
                </button>
              
                {this.state.meet_address &&
                  <div> 
                    <h2> <img class="bluePin"
                                  src="https://icon-library.com/images/pin-icon-png/pin-icon-png-8.jpg"
                                  alt="new"/> {this.state.meet_address ? "Meet Here:" : ""} </h2>
                    <div> {this.state.meet_address ? this.state.meet_address : ""}</div>
                  </div>
                }
            </>
        )

    }


    generateAddressForCenter(lat, lng){
      const {
          mapApi
      } = this.state;

      if (!lat) {
          return;
      }

      const geocoder = new mapApi.Geocoder;

      console.log("gen called")
      geocoder.geocode({'location': {lat: lat, lng: lng}}, (results, status) => {
          console.log(results);
          console.log(status);
          if (status === 'OK') {
              if (results[0]) {
                  console.log("Meet Location: ", results[0].formatted_address)
                  this.setState({
                    meet_address: results[0].formatted_address
                  });
                  return results[0].formatted_address;
              } else {
                  window.alert('No results found');
              }
          } else {
              window.alert('Geocoder failed due to: ' + status);
          }

      });

  }

    render() {
        const {
            places, mapApiLoaded, mapInstance, mapApi,
        } = this.state;


        return (
            <Wrapper>
                <div className="row row-header">
                    <div className="col-6" style={{height: '65vh', width: '50%'}}>
                        <GoogleMapReact
                            center={this.state.center}
                            zoom={this.state.zoom}
                            draggable={this.state.draggable}
                            onChange={this._onChange}
                            onChildMouseDown={this.onMarkerInteraction}
                            onChildMouseUp={this.onMarkerInteractionMouseUp}
                            onChildMouseMove={this.onMarkerInteraction}
                            onChildClick={() => console.log('child click')}
                            onClick={this._onClick}
                            bootstrapURLKeys={{
                                key: 'AIzaSyB3L47aJjmVQz2c0hoDP6WYD-qRaNKdnQU',
                                libraries: ['places', 'geometry'],
                            }}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({map, maps}) => this.apiHasLoaded(map, maps)}
                        >

                            <Marker2
                                text={"PLACEHOLDER"}
                                lat={this.state.meet_loc_lat}
                                lng={this.state.meet_loc_lng}
                            />

                            {this.markerRenderer()}


                        </GoogleMapReact>
                    </div>
                    {mapApiLoaded && (
                        <div className="col-6">
                            <div>
                                <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace}/>
                            </div>
                            <div className="card m-2 p-2 scroll">
                                <h5 class="card-title" ><img class="redPin"
                                  src="https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg"
                                  alt="new"></img>People:
                                </h5>
                                {this.addressRenderer()}
                            </div>  
                            {this.state.places.length === 0 ? "Add people's location to calulate the meeting location" :
                                <this.CalculateCenter/>}
                        </div>
                    )}
                </div>


            </Wrapper>
        );
    }
}

export default MyGoogleMap;