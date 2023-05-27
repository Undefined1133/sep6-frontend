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

    async getActorsByName(name: string) {
        try {
            const response = await axios.get(`${process.env.DB_API}/actor/getActors/${name}`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching actor by name: ${name} failed`);
        }
    }

    async getMostPopularPersons() {
        try {
            const response = await axios.get(`${process.env.DB_API}/actor/getMostPopularActors`);

            return response.data;
        } catch (error) {
            throw new Error(`Fetching most popular persons failed`);
        }
    }


}

const actorService = new ActorService();
export default actorService;