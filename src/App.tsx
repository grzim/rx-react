import './App.css';
import { History, UsersWrapper } from './view/components';
import { Container } from '@mui/material';

function App() {
  return (
    <Container style={{ display: 'flex' }}>
      <UsersWrapper />
      <History />
    </Container>
  );
}

export default App;
