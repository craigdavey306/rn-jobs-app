import { AppDispatch, RootState } from './store';
import { store } from './store';
import authReducer, {
  authenticate,
  logout,
  selectIsAuthenticated,
  selectToken,
} from './authentication';

export { store };
export type { AppDispatch, RootState };
export {
  authReducer,
  authenticate,
  logout,
  selectIsAuthenticated,
  selectToken,
};
