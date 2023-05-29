import axios from 'axios';

class SeriesService {

    async getWeeklyTrendingSeries() {
        try {
            const response = await axios.get(`${process.env.DB_API}/series/getWeeklyTrendingSeries`);

            return response.data;
        } catch (error) {
            throw new Error('Fetching weekly trending series failed');
        }
    }

}

const seriesService = new SeriesService();
export default seriesService;