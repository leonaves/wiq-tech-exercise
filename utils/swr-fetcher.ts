const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    throw new Error('Could not fetch data.');
  }
};

export default fetcher;
