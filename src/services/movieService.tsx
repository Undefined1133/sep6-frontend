import axios from 'axios';

class MovieService {
    async getMostPopularMovies() {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getMostPopularMovies`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching movies failed');
        }
    }

    async getTopRatedMovies() {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getTopRatedMovies`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching movies failed');
        }
    }

    async getMostPopularMoviesByDecade(startDateForDecade: string, endDateForDecade: string) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/MostPopularMoviesByDecade&${startDateForDecade}&${endDateForDecade}`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching movies by decade failed');
        }
    }

    async getWeeklyTrendingMovies() {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getWeeklyTrendingMovies`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching movies failed');
        }
    }

    async getUpcomingMovies() {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getUpcomingMovies`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching movies failed');
        }
    }

    async getMoviesByName(name: string) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/get20MoviesBySearch/${name}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching 5 movies by name: ${name} failed`);
        }
    }

    async getMovieById(id: number) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getMovie/${id}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching movie by id: ${id} failed`);
        }
    }

    async getActorsByMovieId(id: number) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getActorsByMovie/${id}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching actors by id: ${id} failed`);
        }
    }

    async getActorById(id: number) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/getActorsById/${id}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching actors by id: ${id} failed`);
        }
    }


}

const movieService = new MovieService();
export default movieService;