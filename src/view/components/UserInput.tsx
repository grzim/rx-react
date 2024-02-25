import {
  Button,
  Container,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { UsersViewModel } from '../root';

export const UserInput = ({ addUser }: Pick<UsersViewModel, 'addUser'>) => {
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<string | undefined>();
  return (
    <Container>
      <Typography>User input</Typography>
      <InputLabel key={'name'}>
        name <Input value={name} onChange={(e) => setName(e.target.value)} />
      </InputLabel>

      <InputLabel key={'age'}>
        age{' '}
        <Input
          value={age}
          type="number"
          onChange={(e) => setAge(e.target.value)}
        />
      </InputLabel>
      {age && name && (
        <Button onClick={() => addUser({ name, age: Number(age) })}>
          Save
        </Button>
      )}
    </Container>
  );
};
