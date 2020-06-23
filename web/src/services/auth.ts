import { createContext, Dispatch, SetStateAction } from 'react';

interface Auth {
    logged: boolean,
    user: {
        id: number
    }
}

interface Context {
    auth: Auth,
    setAuth: Dispatch<SetStateAction<Auth>>
}

const initialContext: Context = {
    auth: {
        logged: false,
        user: {
            id: -1
        }
    },
    setAuth: (): void => { }
}

const authApi = createContext<Context>(initialContext);

export default authApi;