import './Components/Form/Input.css';
import './App.css';
import MenuNav from './Components/Navbar/Navbar';
import MenuItem from './Components/MenuItem/MenuItem';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaTasks } from 'react-icons/fa';

function App() {

  return (
    <> 
     <MenuNav title={"Sistema DSV1 - OPERACIONAL"}/>
     <MenuItem
      cards={[
        { label: 'Cadastro de pessoas', icon: <FaPeopleGroup />, route: '/register' },
        { label: 'Tasks', route: '/tasks', icon: <FaTasks/>},
      ]}
       />
    </>
  );
}

export default App;
