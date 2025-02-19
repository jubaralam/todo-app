import { Box, Container, Typography } from "@mui/material";


const Contact = () => {


  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "white",
          boxShadow: 3,
          maxWidth: 500,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🚧 Coming Soon!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We're working hard to bring you something amazing. Stay tuned!
        </Typography>
      </Box>
    </Container>
  );
};



export default Contact;
