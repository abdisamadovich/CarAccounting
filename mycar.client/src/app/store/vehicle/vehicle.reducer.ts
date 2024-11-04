import { createReducer, on } from '@ngrx/store';
import { changeVehicle } from './vehicle.actions';

export const initialState = {
    vehicleId: 0
};

export const vehicleReducer = createReducer(
  initialState,
  on(changeVehicle, (state, { vehicleId }) => ({
    ...state,
    vehicleId
  }))
);