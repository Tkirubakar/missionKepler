export const AuthService = {
  login({ email, password }) {
    if (email === "user@example.com" && password === "password") {
      return { token: "fake-jwt-token", name: "Demo User", email };
    }
    throw new Error("Invalid credentials");
  },
  logout() {
  }
};
