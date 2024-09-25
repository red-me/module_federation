const BASE_URL = 'http://localhost:8000/api/v1';

export const getSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/check-session`);
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
};

export const login = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      return {'error': 'Network response was not ok'};
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/signout`);
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/articles`);
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
};

export const createPost = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/create-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}

export const updatePost = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/update-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}
export const deletePost = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/delete-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      return [{'error': 'Network response was not ok'}];
    }
    return await response.json();
  } catch (error) {
    return [{'error': error.message}];
  }
}