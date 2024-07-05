/**
 * Checks if the given remote URL exists
 */
export const ifUrlExist = async (url) => {
  try {
    const response = await fetch(url, {
      mode: 'no-cors'
    });
    return response.status !== 404;
  } catch (e) {
    return false;
  }
};

export default {
  ifUrlExist
};
