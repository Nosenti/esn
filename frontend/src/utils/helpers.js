const makeConfig = () => {
    let storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser.token
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return config
}

export default makeConfig