import styled from 'styled-components';

const rad2degr = (rad) => {
  return rad * 180 / Math.PI;
}

const degr2rad = (degr) => {
  return degr * Math.PI / 180;
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export { rad2degr, degr2rad, Wrapper };