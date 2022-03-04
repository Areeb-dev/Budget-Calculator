import logo from './logo.svg';
import './App.css';
import Todo from "../src/components/Todo"
import Todopdf from "../src/components/Pdf"
function App() {
  return (
    <div className="App">
      {/* <Todo /> */}
      {/* <Pdfkit/> */}
      <Todopdf />
    </div>
  );
}

export default App;
