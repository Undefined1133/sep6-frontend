import axios from 'axios';
import { useEffect } from 'react';

class StatisticService {
    getMovieTotalRatingById(movieId: number | undefined) {
        return axios
            .get(`${process.env.DB_API}statistic/getAverageRatingTotal/${movieId}`)
            .then((response) => {
                return response.data;;
            })
            .catch((error) => {
                throw new Error('Fetching Average rating failed');
            });
    }

    getAverageRatingForActorsMovie(actorId: number | undefined) {
        return axios
            .get(`${process.env.DB_API}statistic/getAverageRatingForActorsMovie/${actorId}`)
            .then((response) => {
                return response.data;;
            })
            .catch((error) => {
                throw new Error('Fetching actors average popularity failed');
            });
    }

}

const statisticService = new StatisticService();
export default statisticService;