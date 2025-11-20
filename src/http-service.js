import {treaty} from "@elysiajs/eden"

const BASE_URL = import.meta.env.VITE_API_URL

const api = treaty(BASE_URL)

export default api;
