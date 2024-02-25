import { useHistoryViewModel } from '../root';

export const History = () => {
  const {filterHistory} = useHistoryViewModel();
  return <div>
    Last 3 filters: <div>{filterHistory?.map(x => <div>{x}</div>)}</div>
  </div>
}