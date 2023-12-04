type Feature = {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: Record<string, unknown>;
};

export type TableResponseDto = {
  type: string;
  features: Feature[];
};
