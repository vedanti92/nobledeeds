import React from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import CampaignCard from "../components/CampaignCard";
import "./SearchResults.css";
import axios from "axios";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      axios.get(`/search`, {
        params: { query },
        withCredentials: true
      })
        .then((response) => {
          setResults(response.data);
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
        <Container maxWidth="lg">
          <Grid 
            container 
            spacing={4}
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{ minHeight: '60vh' }}
          >
            {results.map((campaign) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={campaign._id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '100%' }}>
                  <CampaignCard campaign={campaign} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}

export default SearchResults;
