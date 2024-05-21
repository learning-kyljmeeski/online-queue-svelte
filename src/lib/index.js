// place files you want to import through the `$lib` alias in this folder.
import { goto } from "$app/navigation";
import { getCookie, setCookie, eraseCookie } from "./util/cookies";

const base = "http://localhost:8080";
const tokenCookieName = "online-queue-token";

export function logoutQuery() {
  eraseCookie(tokenCookieName);
  goto("/");
}

export async function signupQuery(data) {
  const url = `${base}/auth/signup`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      goto("/create");
      const responseBody = await response.json();
      setCookie(tokenCookieName, responseBody.token, responseBody.tokenExpiration);
      return { success: true };
    } else {
      console.error("Request failed:", response.status, response.statusText);
      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error };
  }
}

export async function loginQuery(data) {
  const url = `${base}/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      goto("/create");
      const responseBody = await response.json();
      setCookie(tokenCookieName, responseBody.token, responseBody.tokenExpiration);
      return { success: true };
    } else {
      console.error("Request failed:", response.status, response.statusText);
      return {
        success: false,
        status: response.status,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error };
  }
}

export async function createQueueQuery(data) {
  const token = getCookie(tokenCookieName);

  const url = `${base}/queues`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseBody = await response.text();
      goto(`/queues/${responseBody}`);
      return responseBody;
    } else if (response.status === 403) {
      goto("/login");
    } else if (response.status == 307) {
      const redirectPath = await response.text();
      goto(redirectPath);
    } else {
      console.error("Request failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getQueueQuery(token, code) {
  const url = `${base}/queues/${code}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      return { success: true, data: responseBody };
    } else if (response.status === 404) {
      goto("/");
      return { success: false, status: response.status };
    } else {
      console.error("Request failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getQueuesQuery(token) {
  const url = `${base}/queues`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      const responseBody = await response.json();
      const queues = responseBody.queues;
      return { success: true, queues };
    } else if (response.status == 403) {
      goto("/login");
    }
  } catch (error) {}
}

export async function joinQueueQuery(code, name) {
  const token = getCookie(tokenCookieName);
  const url = `${base}/queues/${code}?name=${name}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      goto(`/queues/${code}`);
      return { success: true, data: responseBody };
    } else if (response.status == 404) {
      const responseBody = await response.text();
      return { success: false, message: responseBody };
    } else if (response.status == 400) {
      return { success: false, message: "queue code is wrong" };
    } else {
      console.error("Request failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function callNextQuery(token, code) {
  const url = `${base}/queues/${code}/next`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      goto(`/queues/${code}`);
      const people = await response.json();
      return { success: true, people: people };
    } else if (response.status === 404) {
      return { success: false, message: "queue not found" };
    } else if (response.status === 400) {
      return { success: false, message: "no one to call next" };
    } else if (response.status === 403) {
      return { success: false, message: "it's not your queue" };
    } else {
      console.error("Request failed:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
