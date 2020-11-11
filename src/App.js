import "./App.css";
import Conveyour from "./components/conveyour";
import Controller from "./components/controller";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Conveyour />
        <Controller/>
      </header>
    </div>
  );
}

export default App;
