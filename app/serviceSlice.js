// serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    services: [],
    selectedServices: [],
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setSelectedServices: (state, action) => {
            state.selectedServices = action.payload;
        },
        toggleService: (state, action) => {
            const serviceId = action.payload;
            if (state.selectedServices.includes(serviceId)) {
                state.selectedServices = state.selectedServices.filter(id => id !== serviceId);
            } else {
                state.selectedServices.push(serviceId);
            }
        },
    },
});

export const { setServices, toggleService, setSelectedServices } = serviceSlice.actions;
export default serviceSlice.reducer;