const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Register failed")
  }

  return data
}


export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Login failed")
  }

  return data
}

export async function getMe(token: string | null) {
  if (!token) {
    throw new Error("No token found")
  }

  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Unauthorized")
  }

  return data
}

