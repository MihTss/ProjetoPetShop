const headerToken = () => {
    const token = JSON.parse(sessionStorage.getItem('userLogged')).token
    return {'Authorization': `Bearer ${token}`}
}

export default headerToken