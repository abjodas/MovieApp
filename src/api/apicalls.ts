/* eslint-disable prettier/prettier */
const apikey: string = "c63ebd1e055144ba3a7e7be6ae757386"

export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`

export const searchMovies = (keyword: string) => {
    return `
    https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`
}

export const MovieDetails = (movieId: number) => {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`
}

export const movieCastDetails = (movieId: number) => {
    return `
    https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`
}

export const imageUrl = (size: string, posterPath: string) => {
    return (`https://image.tmdb.org/t/p/${size}${posterPath}`)
}

export const searchCredits = (movieId: number) => {
    return (`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`)
}