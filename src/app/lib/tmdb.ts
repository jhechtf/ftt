
export function tmdb<T = unknown>(input: RequestInfo, init?: RequestInit) {
  const baseUrl = new URL('https://api.themoviedb.org/3');

  const headers = {
    authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    accept: 'application/json',
  };


  // Strings are will be appended to the baseURL
  if (typeof input === 'string') {
    if (input.startsWith('/')) {
      const [path, params] = input.split('?');
      const searchParams = new URLSearchParams(params);
      console.debug(searchParams);
      baseUrl.pathname += path;
      if (searchParams.size > 0) {
        baseUrl.search = searchParams.toString();
      }
    } else {
      baseUrl.href = input;
    }
  } else {
    // requests that are not full URL will be appended to the baseURl
    if (
      !input.url.startsWith('https://') ||
      input.url.startsWith('/')
    ) {
      const parsed = new URL(input.url);

      console.info('Parsed search', parsed);
      baseUrl.pathname += `${input.url.startsWith('/') ? '' : '/'}${input.url}`;
      baseUrl.search = parsed.search
    }
  }

  console.debug(baseUrl.href);

  return fetch(
    baseUrl.href,
    {
      ...init,
      headers: {
        ...headers,
      }
    }
  )
    .then(res => res.json() as T);
}


export async function tmdbError<T = unknown, Err = Error>(input: RequestInfo, init?: RequestInit)
  : Promise<[T, null] | [null, Err]> {
  let err: Err | null = null;
  let ret: T | null = null;

  try {
    ret = await tmdb<T>(input, init);
    return [ret, null];
  } catch (e) {
    err = e as Err;
    return [null, err];
  }

}

export interface TmdbResult<T> {
  page: number;
  results: T[],
  total_pages: number;
  total_results: number;
}

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}