import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './services/apollo';
import reducers from './reducers';
import Cart from './components/Cart';
import ProductList from './components/Products';
import Sidebar from './components/Sidebar';
import './index.css';

const store = createStore(reducers);

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <div className="example">
          <header>MINHA LOJA ONLINE: Agora vou vender mais.</header>
          <main className="main">
            <nav>
              <Sidebar />
            </nav>
            <div className="content">
              <ProductList />
            </div>
            <aside>
              <Cart />
            </aside>
          </main>
          <footer>
            <span>Desenvolvido por @thiago - 2020</span>
          </footer>
        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
