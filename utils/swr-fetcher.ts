const fetcher = async (url: string, options: { post?: boolean, body?: Object} = {}) => {
  try {
    const res = await fetch(url, {
      method: options.post ? 'POST' : 'GET',
      body: JSON.stringify(options.body),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return res.json();
  } catch (e) {
    throw new Error(`Could not fetch data from ${url}`);
  }
};

export default fetcher;
