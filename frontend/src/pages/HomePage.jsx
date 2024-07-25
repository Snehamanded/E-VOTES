import { Container, Typography, Button, NavLink } from "../common/Imports";

const HomePage = () => {
    return (
      <Container style={{ marginTop: '8rem', textAlign: 'center' }}>
        <Typography variant="h2" style={{ marginBottom: '2rem' }}>
          Secure Voting
        </Typography>
        <NavLink to="/voter-login" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: '1rem' }}
          >
            Start Voting
          </Button>
        </NavLink>
      </Container>
    );
  };
  
  export default HomePage;