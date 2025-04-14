import React from "react";
import { useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Container } from "@mui/material";
import CampaignCard from "../components/CampaignCard";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      fetch(`/search?query=${query}`)
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
    <div
      style={{ marginTop: "100px", padding: "20px" }}
      className="results-container mx-5"
    >
      <h2 className="mb-5">Search Results</h2>
      {results.length === 0 ? (
        <h5 className="text-muted">No results found.</h5>
      ) : (
        <Container sx={{ my: 4 }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {results.map((campaign) => (
              <Grid item xs={12} sm={6} md={4}>
                <CampaignCard key={campaign._id} campaign={campaign} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}

export default SearchResults;
