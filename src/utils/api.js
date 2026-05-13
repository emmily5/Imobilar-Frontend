const API_BASE_URL = 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const headers = isFormData
    ? options.headers
    : { 'Content-Type': 'application/json', ...options.headers };

  const response = await fetch(url, { ...options, headers });

  return { ok: response.ok, status: response.status, response };
}

export const authApi = {
  login: (email, senha) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    }),

  cadastro: (dados) =>
    request('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),
};

export const imoveisApi = {
  publicar: (formData) =>
    request('/imoveis', {
      method: 'POST',
      body: formData,
    }),
};
