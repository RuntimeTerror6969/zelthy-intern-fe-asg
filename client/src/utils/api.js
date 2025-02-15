import { API_BASE } from "./config";

export const loginUser = async (username) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim() }),
  });
  return response.json();
};

export const getUser = async (username) => {
  const response = await fetch(`${API_BASE}/users/${username}`);
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE}/users`);
  return response.json();
};

export const addSlot = async (username, date, start, end) => {
  const response = await fetch(`${API_BASE}/users/${username}/availability`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, start, end }),
  });
  return response.json();
};

export const deleteSlot = async (username, date, start, end) => {
  const response = await fetch(`${API_BASE}/users/${username}/availability`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, start, end }),
  });
  return response.json();
};

export const updateSlot = async (
  username,
  date,
  oldStart,
  oldEnd,
  newStart,
  newEnd
) => {
  const response = await fetch(`${API_BASE}/users/${username}/availability`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, oldStart, oldEnd, newStart, newEnd }),
  });
  return response.json();
};

export const copyAvailability = async (username, sourceDate, targetDate) => {
  const response = await fetch(
    `${API_BASE}/users/${username}/availability/copy`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceDate, targetDate }),
    }
  );
  return response.json();
};

export const updateTimezone = async (username, timezone) => {
  const response = await fetch(`${API_BASE}/users/${username}/timezone`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ timezone }),
  });
  return response.json();
};
