import { type Movie, tmdb, type TmdbResult } from './lib/tmdb';

export default async function Home() {
  const data = await tmdb<TmdbResult<Movie>>('/discover/movie');

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Discover new movies
      </h1>
      {
        data.results.map(movie => (
          <div key={movie.id}>
            <header>
              {movie.title}
            </header>
          </div>
        ))
      }
    </div>
  );
}
