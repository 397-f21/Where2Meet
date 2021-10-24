import './App.css';
import MyGoogleMap from './components/MyGoogleMap';
function App() {


  return (
    <div className="App">
      <h1 data-testid = "AppTitle">Where2Meet</h1>
      {/* <MainPostTopicComponent/> */}
      <div className="main-wrapper">
        <MyGoogleMap />
      </div>
    </div>
  );
}

export default App;
