const rad2degr = (rad) => {
  return rad * 180 / Math.PI;
}

const degr2rad = (degr) => {
  return degr * Math.PI / 180;
}

export { rad2degr, degr2rad };

export const getLatLngCenter = (places) => {
  var places_length = places.length
  var sumX = 0;
  var sumY = 0;
  var sumZ = 0;

  var lat;
  var lng

  for (var i = 0; i < places_length; i++) {
      lat = degr2rad(places[i].lat);
      lng = degr2rad(places[i].lng);
      sumX += Math.cos(lat) * Math.cos(lng);
      sumY += Math.cos(lat) * Math.sin(lng);
      sumZ += Math.sin(lat);
  }

  var avgX = sumX / places_length;
  var avgY = sumY / places_length;
  var avgZ = sumZ / places_length;

  lng = Math.atan2(avgY, avgX);
  var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  lat = Math.atan2(avgZ, hyp);

  return [rad2degr(lat), rad2degr(lng)];
}