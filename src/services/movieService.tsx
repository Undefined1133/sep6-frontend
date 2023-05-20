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

    async getMostPopularSeries() {
        try {
            const response = await axios.get(`${process.env.DB_API}/series/getMostPopularSeries`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching series failed');
        }
    }

    async getMoviesByName(name: string) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/get5MoviesBySearch/${name}`);

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