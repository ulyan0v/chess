import {Store} from '../../store';

const store = new Store();

export const useStore = () => {
  return store;
}
