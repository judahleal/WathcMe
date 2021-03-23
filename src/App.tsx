import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/global.scss';
import { useState } from 'react';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function selectGenre(newGenreId: number) {
    setSelectedGenreId(newGenreId);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar changeSelectedGenreId={selectGenre} />
      <Content genreId={selectedGenreId} />
    </div>
  )
}