import styled from 'styled-components';

const AutoCompleteWrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  text-align:center;
`;

const UserPinWrapper = styled.div`
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

const CenterPinWrapper = styled.div`
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

const RecommendationPinMarker = styled.div`
  position: absolute;
  width: 38px;
  height: 37px;
  background-image: url(https://icon-library.com/images/pin-icon-png/pin-icon-png-11.jpg);
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

const MapWrapper = styled.main`
  width: 100%;
  height: 100%;
`;


export { AutoCompleteWrapper, UserPinWrapper, CenterPinWrapper, RecommendationPinMarker, MapWrapper }