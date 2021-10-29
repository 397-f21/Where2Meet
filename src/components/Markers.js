// Marker.js
import React from 'react';
import PropTypes from 'prop-types';
import { UserPinWrapper, CenterPinWrapper } from '../utils/wrappers';

export const Marker = ({ text, onClick }) => (
    <UserPinWrapper
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

export const Marker2 = ({ text, onClick }) => (
    <CenterPinWrapper
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
