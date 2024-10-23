// HandleAuthentication.js

export const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return { success: true, token: data.token };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    return { success: false, message: "An error occurred. Please try again." };
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const handleLogout = () => {
  localStorage.removeItem("token");
  // Redirect to login page or update UI accordingly
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};