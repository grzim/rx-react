import { FilterService } from '../../services';
import { useSubscriptions } from '../../core';

export const getHistoryViewModel = (filersService: FilterService) => {
  const { filterHistory$} = filersService;

  return function useViewModel() {
    const [filterHistory] = useSubscriptions(filterHistory$);
    return {
      filterHistory
    }
  }
}