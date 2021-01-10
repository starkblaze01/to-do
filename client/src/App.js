import './App.css';
import 'antd/dist/antd.css';
import { Provider } from "react-redux";
import ToDo from './components/ToDo';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ToDo/>
    </Provider>
  );
}

export default App;
