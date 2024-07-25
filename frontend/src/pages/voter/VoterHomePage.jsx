// import  { useState } from 'react';
// import Container from '@mui/material/Container';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import { useNavigate } from 'react-router-dom';
// const contestants = [
//   {
//     id: 1,
//     name: 'RCB',
//     party: 'Royal Challengers Banglore',
//     photo: 'https://via.placeholder.com/150',
//   },
//   {
//     id: 2,
//     name: 'MI',
//     party: 'Mumbai Indians',
//     photo: 'https://via.placeholder.com/150',
//   },
//   {
//     id: 3,
//     name: 'CSK',
//     party: 'Chennai Super Kings',
//     photo: 'https://via.placeholder.com/150',
//   },
// ];


// const VotingInterface = () => {
//    // used for redirect
//    const navigate = useNavigate();
//   const [selectedContestant, setSelectedContestant] = useState('');

//   const handleSelectChange = (event) => {
//     setSelectedContestant(event.target.value);
//   };

//   const handleVote = () => {
//     const selected = contestants.find(contestant => contestant.id.toString() === selectedContestant);
//     if (selected) {
//       console.log(`Voted for: ${selected.name} from ${selected.party}`);
//       setSelectedContestant(''); // Clear selected contestant after voting
//     }
//   };

//   const handleLogout = () => {
//     // Add logout logic here (e.g., clear session, redirect to login page, etc.)
//     // navigate to welcome page
//     navigate("/voter-login");
//     console.log('User logged out');
//   };

//   return (
//     <Container style={{ marginTop: '2rem' }}>
//       <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '1rem' }}>
//         <Typography variant="h4">
//           Voting Interface
//         </Typography>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </Grid>
//       <Grid container spacing={4}>
//         {contestants.map((contestant) => (
//           <Grid item xs={12} sm={6} md={4} key={contestant.id}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="150"
//                 image={contestant.photo}
//                 alt={contestant.name}
//               />
//               <CardContent>
//                 <Typography variant="h5">{contestant.name}</Typography>
//                 <Typography variant="subtitle1" color="textSecondary">
//                   {contestant.party}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <FormControl fullWidth variant="outlined" style={{ margin: '2rem 0' }}>
//         <InputLabel id="contestant-select-label">Select Contestant</InputLabel>
//         <Select
//           labelId="contestant-select-label"
//           id="contestant-select"
//           value={selectedContestant}
//           onChange={handleSelectChange}
//           label="Select Contestant"
//         >
//           {contestants.map((contestant) => (
//             <MenuItem key={contestant.id} value={contestant.id.toString()}>
//               {contestant.name} ({contestant.party})
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Grid container justifyContent="center">
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleVote}
//           disabled={!selectedContestant}
//         >
//           Vote
//         </Button>
//       </Grid>
//     </Container>
//   );
// };

// export default VotingInterface;
import  { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const contestants = [
  {
    id: 1,
    name: 'RCB',
    party: 'Royal Challengers Banglore',
    photo: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'MI',
    party: 'Mumbai Indians',
    photo: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'CSK',
    party: 'Chennai Super Kings',
    photo: 'https://via.placeholder.com/150',
  },
];

const VotingInterface = () => {
  const navigate = useNavigate();
  const [selectedContestant, setSelectedContestant] = useState('');
  const [isVotingActive, setIsVotingActive] = useState(false);

  useEffect(() => {
    // Fetch the current election status on component mount
    const fetchElectionStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/election-status');
        const { start_date, end_date } = response.data || {};
        
        const currentDate = new Date();
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (currentDate >= startDate && currentDate <= endDate) {
          setIsVotingActive(true);
        } else {
          setIsVotingActive(false);
        }
      } catch (error) {
        console.error('Error fetching election status:', error);
      }
    };

    fetchElectionStatus();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedContestant(event.target.value);
  };

  const handleVote = () => {
    const selected = contestants.find(contestant => contestant.id.toString() === selectedContestant);
    if (selected) {
      console.log(`Voted for: ${selected.name} from ${selected.party}`);
      setSelectedContestant(''); // Clear selected contestant after voting
    }
  };

  const handleLogout = () => {
    navigate("/voter-login");
    console.log('User logged out');
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '1rem' }}>
        <Typography variant="h4">
          Voting Interface
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Grid>
      <Grid container spacing={4} className='logo'>
        {contestants.map((contestant) => (
          <Grid item xs={12} sm={6} md={4} key={contestant.id}>
            <Card className='card zoom-card max-w-[270px]'>
              <CardMedia
              className='card-img-top zoom-img'
                component="img"
                height="150"
                image={contestant.photo}
                alt={contestant.name}
              />
              <CardContent className='card-body'>
                <Typography variant="h5" className='card-title'>{contestant.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary" className='card-text'>
                  {contestant.party}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isVotingActive ? (
        <>
          <FormControl fullWidth variant="outlined" style={{ margin: '2rem 0' }}>
            <InputLabel id="contestant-select-label">Select Contestant</InputLabel>
            <Select
              labelId="contestant-select-label"
              id="contestant-select"
              value={selectedContestant}
              onChange={handleSelectChange}
              label="Select Contestant"
            >
              {contestants.map((contestant) => (
                <MenuItem key={contestant.id} value={contestant.id.toString()}>
                  {contestant.name} ({contestant.party})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleVote}
              disabled={!selectedContestant}
            >
              Vote
            </Button>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '2rem' }}>
          Voting is not active at this time.
        </Typography>
      )}
    </Container>
  );
};

export default VotingInterface;
