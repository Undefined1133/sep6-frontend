import axios from 'axios';

class ActorService {

    async getActorById(id: number) {
        try {
            const response = await axios.get(`${process.env.DB_API}/actor/getActorById/${id}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching actor by id: ${id} failed`);
        }
    }

    async getMoviesByActorId(id: number) {
        try {
            const response = await axios.get(`${process.env.DB_API}/actor/getMoviesByActorId/${id}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching movies by actorId: ${id} failed`);
        }
    }

}

const actorService = new ActorService();
export default actorService;