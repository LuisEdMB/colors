import { Provider } from 'react-redux';

import "./styles/styles.css";

import { store } from './store/store.configure';

import AppComponent from './components/App'

function App() {
  return (
    <Provider store={ store }>
      <AppComponent />
    </Provider>
  )
}

export default App;
