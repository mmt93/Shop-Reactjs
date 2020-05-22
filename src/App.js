import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './components/Cart';
import ProductList from './components/Products';
import Sidebar from './components/Sidebar'
import { ApolloProvider } from 'react-apollo';
import apolloClient from './services/apollo';
import './index.css'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        {/* <div className="example">
          <main className="main">
            <nav style={{flexGrow: 1}}><Sidebar /></nav>
            <div className="content"><ProductList /></div>
            <aside style={{flexGrow: 1}}><Cart /></aside>
            
          </main>
          <div className="footer"> olá </div>
        </div> */}
        
        <div class="example">
          <header>
            MINHA LOJA ONLINE: Agora vou vender mais.
          </header>
          <main class="main">
            <nav>
              <Sidebar />
            </nav>
            <div class="content">
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
