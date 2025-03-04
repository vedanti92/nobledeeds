import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      fetch(`http://localhost:8080/search?query=${query}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Search failed:', error);
          setLoading(false);
        });
    }
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {results.map(campaign => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults; 