import axios from 'axios';
import { useEffect } from 'react';

class UserService {
    login(username: string, password: string) {
        return axios
            .get(`${process.env.DB_API}user/login/${username}/${password}`)
            .then((response) => {
                const userData = response.data;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                window.location.href = "/movies";
                return userData;
            })
            .catch((error) => {
                throw new Error('Login failed');
            });
    }

    register(email: string, password: string, username: string) {
        return axios
            .post(`${process.env.DB_API}user/postCreateUser/${username}/${email}/${password}`)
            .then((response) => {
                const userData = response.data;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                window.location.href = "/movies";
                return userData;
            })
            .catch((error) => {
                throw new Error('Register failed');
            });
    }

    getFavoriteMovies(userId: string) {
        return axios
            .get(`${process.env.DB_API}user/getAllMyFavoriteMovies/${userId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error('Fetching favorite movies failed');
            });
    }

    setMovieRating(movieRating: IMovieRating) {
        return axios
            .post(`${process.env.DB_API}user/setMovieRating`, movieRating)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error('Setting rating for movie failed');
            });
    }
    getMovieRating(userId: number, movieId: number) {
        return axios
            .get(`${process.env.DB_API}user/getMovieRating/${userId}/${movieId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error('Fetching movies rating failed');
            });
    }

    setFavoriteMovie(favoriteMovie: IFavoriteMovie) {
        return axios
            .post(`${process.env.DB_API}user/setFavoriteMovie`, favoriteMovie)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error('Setting favorite movie failed');
            });
    }

    isFavoriteMovie(userId: number, movieId: number | undefined){
        return axios
            .get(`${process.env.DB_API}user/getFavoriteMovie/${userId}/${movieId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error('Fetching favorite movies failed');
            });
    }


    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        window.location.href = "/movies";
    }

    getCurrentUser() {
        if (typeof window !== 'undefined') {
            const userJson = localStorage.getItem('user');
            return userJson ? JSON.parse(userJson) : null;
        }
        return null;
    }
}

const userService = new UserService();
export default userService;