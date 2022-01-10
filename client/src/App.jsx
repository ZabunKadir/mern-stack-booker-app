import AppRoute from "./route/index.jsx";
import { Provider } from "react-redux";
import store from "./store";
import "./styles/main.scss";

const App = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};
export default App;
