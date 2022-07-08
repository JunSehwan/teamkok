const HOST = process.env.NEXT_PUBLIC_ENV_HOST
const PORT = process.env.NEXT_PUBLIC_ENV_PORT
const BASE_URL = `${HOST}:${PORT}`

const url = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json"
  }
});