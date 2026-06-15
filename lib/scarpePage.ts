const fetchPage = async () => {
  const url = "https://www.espn.com/soccer/schedule/_/league/fifa.world"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  return html;
}

export { fetchPage };