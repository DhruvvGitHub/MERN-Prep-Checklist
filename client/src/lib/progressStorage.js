import { getUser } from "./authStorage.js";

function getUserKey() {
  const user = getUser();
  if (!user) return "guest";
  return user._id || user.id || user.email || "user";
}

function storageKey() {
  return `mpc_progress_${getUserKey()}`;
}

export function loadProgress() {
  const raw = localStorage.getItem(storageKey());
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveProgress(checkedMap) {
  localStorage.setItem(storageKey(), JSON.stringify(checkedMap || {}));
}

