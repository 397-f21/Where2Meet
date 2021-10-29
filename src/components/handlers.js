const onMapChange = (center, zoom, setCenter, setZoom) => {
    console.log("center:", center);
    setCenter(center);
    setZoom(zoom);
};




const apiHasLoaded = (map, maps, mapState, setMapState) => {
    setMapState({
        ...mapState,
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
    });
};

export { onMapChange, apiHasLoaded };