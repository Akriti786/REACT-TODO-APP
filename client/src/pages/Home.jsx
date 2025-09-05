import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Link,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const travelCards = [
  {
    title: "Mountain Trekking",
    description: "Explore mountain adventures, perfect for thrill-seekers.",
    image: "https://source.unsplash.com/featured/?mountains",
    features: ["Guided treks", "Scenic trails", "Camping support"],
  },
  {
    title: "Forest Adventure",
    description: "Reconnect with nature in lush forests.",
    image: "https://source.unsplash.com/featured/?forest",
    features: ["Nature walks", "Wildlife exploration", "Eco-camping"],
  },
  {
    title: "Beach Vibes",
    description: "Relax at serene beaches for sunsets and surfing.",
    image: "https://source.unsplash.com/featured/?beach",
    features: ["Beachside resorts", "Water sports", "Sunset cruises"],
  },
  {
    title: "Camping Fun",
    description: "Enjoy organized camping for families.",
    image: "https://source.unsplash.com/featured/?camping",
    features: ["Tents provided", "Campfire games", "Safe zones"],
  },
  {
    title: "Wilderness Escape",
    description: "Venture deep into wild unexplored nature.",
    image: "https://source.unsplash.com/featured/?wilderness",
    features: ["Survival skills", "Remote areas", "Natural beauty"],
  },
  {
    title: "Road Trip",
    description: "Pack your bags and hit the road!",
    image: "https://source.unsplash.com/featured/?roadtrip",
    features: ["Custom routes", "Travel kits", "Car support"],
  },
];

function Home() {
  const { user } = useAuth();

  return (
    <Container sx={{ mt: 5 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" fontWeight="bold" color="green">
          {user ? `Welcome back, ${user.name}!` : "Welcome to the Todo App"}
        </Typography>
        <Typography mt={1}>
          {user
            ? "Keep conquering your goals while exploring the world 🌍"
            : "Please Sign In or Sign Up to continue."}
        </Typography>
      </Box>

      {user && (
        <Grid container spacing={4} justifyContent="center">
          {travelCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: 4,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={card.image}
                  alt={card.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                    {card.features.map((feature, idx) => (
                      <li key={idx}>
                        <Typography variant="body2">{feature}</Typography>
                      </li>
                    ))}
                  </Box>
                  {/* <Box mt={2}>
                    <Link href="#" underline="hover" color="primary" fontWeight="bold">
                      Read more &gt;
                    </Link>
                  </Box> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
