import { UserInput } from './UserInput.tsx';
import { UsersDisplay } from './UsersDisplay.tsx';
import { useUsersViewModel } from '../root';
import { Filters } from './Filters.tsx';
import { Container } from '@mui/material';


export const UsersWrapper = () => {
  const {
    addUser,
    onSetAgeFilter,
    onSetNameFilter,
    deleteUser,
    users, filterLabel
  } = useUsersViewModel()
  if(!users) return
  return <Container style={{display: 'flex'}}>
    <UserInput addUser={addUser}/>
    <UsersDisplay users={users} deleteUser={deleteUser}/>
    <Filters onSetAgeFilter={onSetAgeFilter} onSetNameFilter={onSetNameFilter} filterLabel={filterLabel} />
  </Container>
}

