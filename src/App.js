import './App.css';
import CreateElementMethod from './components/CreateElementMethod';
import ComponentMethod from './components/ComponentMethod';
import PureComponent from './components/PureComponent';
import FunctionalComponent from './components/FunctionalComponent';

function App() {
  return (
    <div className="App">
      <CreateElementMethod />
      <ComponentMethod />
      <PureComponent />
      <FunctionalComponent/>
    </div>
  );
}

export default App;
