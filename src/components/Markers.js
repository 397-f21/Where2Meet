// Marker.js
import React from 'react';
import PropTypes from 'prop-types';
import { UserPinWrapper, CenterPinWrapper, RecommendationPinMarker } from '../utils/wrappers';

export const Marker = ({ text, onClick }) => (
    <UserPinWrapper data-testid="locationMarker"
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
    <CenterPinWrapper data-testid="meetMarker"
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

export const Marker3 = ({ text, onClick }) => (
    <RecommendationPinMarker data-testid="recommendationMarker"
        alt={text}
        onClick={onClick}
    />
);

Marker3.defaultProps = {
    onClick: null,
};

Marker3.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

