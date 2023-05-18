import axios from 'axios';

class UserService {
    async login(email: string, password: string) {
        try {
            const response = await axios.get(`${process.env.DB_API}/user/login/${email}/${password}`);

            return response.data;
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    async register(email: string, password: string, username: string){
        try {
            const response = await axios.get(`${process.env.DB_API}/user/register/${email}/${password}`);

            return response.data;
        } catch (error) {
            throw new Error('Register failed');
        }
    }
}

const userService = new UserService();
export default userService;