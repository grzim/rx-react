import { UsersViewModel, useUsersServiceModel } from '../root';
import { Button } from '@mui/material';

export const UsersDisplay = ({users, deleteUser}: Pick<UsersViewModel,'users' | 'deleteUser'>) => {
  const { postUsers, fetchUsers } = useUsersServiceModel();
  return <div>
    users:
    {users.map(user => <div>
    {user.name} {user.age} <button onClick={() => deleteUser(user)}>Delete</button>
  </div>)}
    <Button disabled={users.length === 0} onClick={postUsers}>
      Post users
    </Button>
    <Button onClick={fetchUsers}>
      Get users
    </Button>
  </div>
}