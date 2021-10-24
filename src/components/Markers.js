// Marker.js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 38px;
  height: 37px;
  background-image: url(https://icon-library.com/images/pin-icon-png/pin-icon-png-9.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: grab;
`;

export const Marker = ({text, onClick}) => (
    <Wrapper
        alt={text}
        onClick={onClick}
    />
);

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};


const Wrapper2 = styled.div`
  position: absolute;
  width: 38px;
  height: 37px;
  background-image: url(https://icon-library.com/images/pin-icon-png/pin-icon-png-8.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: grab;
`;

export const Marker2 = ({text, onClick}) => (
    <Wrapper2
        alt={text}
        onClick={onClick}
    />
);

Marker2.defaultProps = {
    onClick: null,
};

Marker2.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};
