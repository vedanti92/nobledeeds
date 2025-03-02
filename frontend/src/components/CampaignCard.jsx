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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 160 }}
        image={campaign.image}
        title={campaign.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {campaign.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {campaign.description}
        </Typography>
        {/* Progress Bar for Donations */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(campaign.raisedAmount / campaign.goalAmount) * 100}
          />
          <Typography variant="caption">
            {campaign.raisedAmount} Amount Raised
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button href={`/${campaign._id}`} size="small" variant="outlined">
          Show More
        </Button>
        <Button href="/" size="small" variant="contained" color="error">
          Donate
        </Button>
      </CardActions>
    </Card>
  );
}
