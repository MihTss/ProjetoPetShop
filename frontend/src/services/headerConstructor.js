//Função responsável por montar o conteúdo do header usando o token armazenado na sessionStorage do navegador
const headerToken = () => {
    const token = JSON.parse(sessionStorage.getItem('userLogged')).token
    return {'Authorization': `Bearer ${token}`}
}

export default headerToken