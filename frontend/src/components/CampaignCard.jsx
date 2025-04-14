import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

export default function CampaignCard({ campaign }) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ height: "26rem", width: "24rem" }}>
      <CardMedia
        sx={{ height: 160, fontFamily: "Merriweather, serif" }}
        image={campaign.image}
        title={campaign.title}
      />
      <CardContent>
        <div className="body" style={{ height: "8rem" }}>
          <Typography
            gutterBottom
            style={{
              fontSize: "18px",
              fontWeight: "500",
              fontFamily: "Merriweather, serif",
            }}
          >
            {campaign.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              fontFamily: "Merriweather, serif",
            }}
          >
            {campaign.description}
          </Typography>
        </div>
        {/* Progress Bar for Donations */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(campaign.raisedAmount / campaign.goalAmount) * 100}
          />
          <Typography
            variant="caption"
            sx={{ fontFamily: "Merriweather, serif" }}
          >
            ₹ {campaign.raisedAmount} Amount Raised
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "Merriweather, serif",
        }}
      >
        <Button
          href={`/${campaign._id}`}
          variant="outlined"
          sx={{ fontFamily: "Merriweather, serif" }}
        >
          Show More
        </Button>
        <Button
          href={`/donate/${campaign._id}`}
          variant="outlined"
          color="error"
          sx={{ fontFamily: "Merriweather, serif" }}
        >
          Donate
        </Button>
      </CardActions>
    </Card>
  );
}
