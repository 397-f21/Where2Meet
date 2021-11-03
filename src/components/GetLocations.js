
import AutoComplete from "./Autocomplete";
import { LocateMe } from "./LocateMe";
export const GetLocations = ({ mapState, places, setPlaces, setZoom }) =>{

    const addPlace = (place, mapState, places, setPlaces, setZoom) => {
        const { mapApi } = mapState;
        const geocoder = new mapApi.Geocoder();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        console.log("Place looks like: ", place);

        geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    setZoom(15);
                    const newPlace =
                    {
                        place: place,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        address: results[0].formatted_address
                    }
                    setPlaces([...places, newPlace]);
                    console.log("places:", places);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };

    if (mapState.mapApiLoaded) {
        return (
            <>
                <div class="row m-1">
                    <div className="col-md-9">
                        <AutoComplete map={mapState.mapInstance} mapApi={mapState.mapApi}
                            addplace={(place) => addPlace(place, mapState, places, setPlaces, setZoom)} />
                    </div>
                    <div className="col-md-3">
                        <LocateMe mapState={mapState} places={places} setPlaces={setPlaces} setZoom={setZoom} />
                    </div>
    
                </div>
            </>
        )
    } else return (<></>);
}