
const API_BASE_URL = 'http://localhost:3000';



const authService = {
    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Registration failed: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },

    async login(login, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Login failed: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Store token
            return data; // Return user data and token
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    async logout() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn("No token found, assuming already logged out.");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token for server-side invalidation
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.warn("Logout request failed, but cleaning client-side regardless", errorData);
            }

            localStorage.removeItem('token'); // Clear the token regardless of backend success
        } catch (error) {
            console.error('Error during logout:', error);
            localStorage.removeItem('token'); // Still clear the token even if request fails
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },
};

// Make authService globally accessible (if needed)
window.authService = authService;


// <button onclick="authService.login('user', 'password').then(data => console.log(data)).catch(err => console.error(err))">Login</button>