import { useState } from 'react';
import { Container, Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import axios from 'axios';

const DeclareResults = () => {
  const [winner, setWinner] = useState('');
  const [totalVotes, setTotalVotes] = useState('');
  const [error, setError] = useState(null);

  const handleDeclareResults = async () => {
    try {
      const response = await axios.get('/api/candidates');
      const candidates = response.data.candidates;

      if (candidates.length === 0) {
        setError('No candidates found.');
        return;
      }

      let highestVotes = 0;
      let winningCandidate = '';

      candidates.forEach(candidate => {
        if (candidate.votes > highestVotes) {
          highestVotes = candidate.votes;
          winningCandidate = candidate.name;
        }
      });

      setWinner(winningCandidate);
      setTotalVotes(highestVotes);
      setError(null);
    } catch (error) {
      console.error('Error fetching vote counts:', error);
      setError('Failed to fetch vote counts');
    }
  };

  return (
    <Container style={{ marginTop: '80px', maxWidth: '600px' }}>
      <Card>
        <CardHeader title="Declare Election Results" className="bg-primary text-white" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Click the button below to declare the election results
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={handleDeclareResults}
          >
            Declare Results
          </Button>
          {error && (
            <Typography variant="body2" color="error" align="center" paragraph>
              {error}
            </Typography>
          )}
          {winner && (
            <Typography variant="body1" paragraph style={{ marginTop: '20px' }}>
              <strong>Winner:</strong> {winner}
            </Typography>
          )}
          {totalVotes && (
            <Typography variant="body1" paragraph>
              <strong>Total Votes:</strong> {totalVotes}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DeclareResults;
