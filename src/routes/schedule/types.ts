export type ShiftType = 'am' | 'pm' | 'night';

export type Schedule = Record<string, Record<ShiftType, Array<string>>>;
