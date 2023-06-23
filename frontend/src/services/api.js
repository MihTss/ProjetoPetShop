import axios from "axios";

const urlBack = "http://localhost:3000"

//Configuração do axios para o url correto, bem como adição do header que define o tipo de dado que será enviado nas requisições.
const api = axios.create({
    baseURL: urlBack,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;