const axios = require('axios');

const baseUrl = "https://tiptop-server.vercel.app/";

describe("Page Server Test", () => {
  test('Verifier que le serveur est actif', async () => {
    try {
      const response = await axios.get(baseUrl);
      
      expect(response.data).toContain('Welcome ');
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  });
});
