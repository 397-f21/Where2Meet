const rad2degr = (rad) => {
  return rad * 180 / Math.PI;
}

const degr2rad = (degr) => {
  return degr * Math.PI / 180;
}

export { rad2degr, degr2rad };