import { useState, useEffect, Props } from 'react';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';
import '../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreIdProps {
  genreId: number;
}

export function Content({ genreId }: GenreIdProps) {
  // const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  //setSelectedGenreId(genreId);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${genreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [genreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}