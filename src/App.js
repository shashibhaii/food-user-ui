import './App.css';
import Categories  from './components/categories/categories'
import MenuItems from './components/categories/menu-items/menu-items';
import { BrowserRouter, Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="categories" element={<Categories />} />
          <Route path="menu-items" element={<MenuItems />} />
        </Route>
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
