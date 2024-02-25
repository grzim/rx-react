import { UsersViewModel } from '../root';
import {
  Container,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

export const Filters = ({
  onSetNameFilter,
  filterLabel,
  onSetAgeFilter,
}: Pick<
  UsersViewModel,
  'onSetNameFilter' | 'filterLabel' | 'onSetAgeFilter'
>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>Filters</Typography>
      <Container>
        <InputLabel>
          Name
          <Input name="name" onChange={onSetNameFilter} />
        </InputLabel>
      </Container>
      <Container>
        <InputLabel>
          Age range
          <Select
            style={{ width: 200, margin: 12 }}
            value={filterLabel}
            label="filter"
            onChange={onSetAgeFilter}
          >
            <MenuItem value={'adult'}>adults</MenuItem>
            <MenuItem value={'kids'}>kids</MenuItem>
            <MenuItem value={'all'}>all</MenuItem>
          </Select>
        </InputLabel>
      </Container>
    </div>
  );
};
