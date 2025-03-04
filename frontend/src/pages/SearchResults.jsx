import React from "react";
import { useSearchParams } from "react-router-dom";
import CampaignCard from "../components/CampaignCard";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetch(`http://localhost:8080/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Search failed:", error);
          setLoading(false);
        });
    }
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ marginTop: "100px", padding: "20px" }} className="mx-5">
      <h2 className="mb-5">Search Results</h2>
      {results.length === 0 ? (
        <h5 className="text-muted">No results found.</h5>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gap: "50px",
            justifyContent: "center",
          }}
        >
          {results.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
