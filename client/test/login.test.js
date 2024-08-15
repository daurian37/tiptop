// login.test.js
const { login } = require("./login");
const mockAxios = require("jest-mock-axios").default;

afterEach(() => {
  mockAxios.reset();
});

test("erreur lorsque l'e-mail est manquant", async () => {
  const credentials = { email: "", password: "Password@2024" };
  const errorMessage = "Aucun utilisateur ne correspond à ce compte.";

  await expect(login(credentials)).rejects.toEqual(errorMessage);
});

test("erreur lorsque le password est manquant", async () => {
  const credentials = { email: "Stephan38@gmail.com", password: "" };
  const errorMessage = "Email ou mot de passe incorrect";

  await expect(login(credentials)).rejects.toEqual(errorMessage);
});
