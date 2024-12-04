import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './slices/projects';
import { authReducer } from './slices/auth';

const Middleware = store => next => action => {
    console.log('Dispatching action:', action);
    let result = next(action);
    console.log('Next state:', store.getState());
    return result;
};

const store = configureStore({
    reducer: {
        projects: projectReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(Middleware),
});

export default store;
