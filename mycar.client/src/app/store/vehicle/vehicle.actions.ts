import { createAction, props } from '@ngrx/store';

export const changeVehicle = createAction('[Vehicle Component] Change', props<{ vehicleId: number }>());