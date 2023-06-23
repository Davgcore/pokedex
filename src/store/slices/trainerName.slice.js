import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice =createSlice({
    name: 'trainerName',
    initialState: '',
    reducers : { // actions
        // function(valueActual, ParametroEntrada)
        setTrainerNameG: (state, action) => action.payload
    }
})

export const { setTrainerNameG } = trainerNameSlice.actions
export default trainerNameSlice.reducer