import { useEffect, useState, ChangeEvent } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import { getData } from './utils/data.utils';
import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filtredMonsters, setFiltredMonsters] = useState(monsters);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>(
        'http://jsonplaceholder.typicode.com/users'
      );
      setMonsters(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const newFiltredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );

    setFiltredMonsters(newFiltredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monster Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <CardList monsters={filtredMonsters} />
    </div>
  );
};

export default App;
