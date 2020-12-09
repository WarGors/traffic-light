import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import TrafficLight from './trafficLight/trafficLight';

function App(props) {
  const path = props.history.location.pathname
  
  useEffect(() => {
    const storageColor = localStorage.getItem('color')
    const newPath = storageColor ? `/${storageColor}` : '/'
    
    props.history.push(path === '/' ? newPath : path)
  }, [props.history, path])
 
  return (
    <div className="App">
      <Route path='/:color' exact component={TrafficLight} />
    </div>
  );
}

export default withRouter(App);
