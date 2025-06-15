import { create } from 'zustand';

export interface JourneyParams {
  destination: string;
  speed: number;
  travelTime: number;
}

interface ShipSimState {
  simulatedYear: number;
  isJourneyActive: boolean;
  elapsedTime: number;
  timeCompression: number;
  yearInTheShip: number;
  onStartJourney?: (p: JourneyParams) => void;
  isFreeLook: boolean;
  toggleFreeLook: () => void;
  setHUD: (partial: Partial<ShipSimState>) => void;
}

export const useShipSimStore = create<ShipSimState>((set) => ({
  simulatedYear: 0,
  isJourneyActive: false,
  elapsedTime: 0,
  timeCompression: 0,
  yearInTheShip: new Date().getFullYear(),
  onStartJourney: undefined,
  isFreeLook: false,
  toggleFreeLook: () => set((s) => ({ isFreeLook: !s.isFreeLook })),
  setHUD: (partial) => set(partial),
})); 