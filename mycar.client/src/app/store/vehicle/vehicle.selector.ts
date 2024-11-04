import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from './vehicle.state';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicleId');

export const selectVehicleId = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.vehicleId
);
