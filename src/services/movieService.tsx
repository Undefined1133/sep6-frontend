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

    async get5MoviesByName(name: string) {
        try {
            const response = await axios.get(`${process.env.DB_API}/movie/get5MoviesBySearch/${name}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching 5 movies by name: ${name} failed`);
        }
    }
}

const movieService = new MovieService();
export default movieService;