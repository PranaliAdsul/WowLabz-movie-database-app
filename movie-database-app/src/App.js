import { useState } from 'react';
import './App.css';
import Header from './components/Header'
import MoviesList from './pages/MoviesList';
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import FavoritesList from './pages/FavoritesList';
import { Provider } from 'react-redux';
import store from './redux/stores';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <Provider store={store}>
    <div className="App">
        <BrowserRouter>
        <Header setSearchResults={setSearchResults}/>
      <Routes>
      <Route path="/" element={<MoviesList searchResults={searchResults} />} />
        <Route path="/Favorites" element={<FavoritesList />} />
      </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}
export default App;