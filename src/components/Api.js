const BASE_URL = "https://nodereiseapp.herokuapp.com";

class Api {
    static async login(email, password) {
        const loginUrl = `${BASE_URL}/login`;

        const response = await fetch(loginUrl, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return response.status === 200;
    }
}

export default Api;