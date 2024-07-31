

import { useContext } from 'react';
import UserContext from './UserContext'; // Adjust path if necessary

export const useUser = () => {
    return useContext(UserContext);
};
