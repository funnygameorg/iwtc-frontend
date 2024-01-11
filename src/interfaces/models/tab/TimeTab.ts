export interface TimeTab {
    id: number;
    name: '전체' | '년' | '월' | '일';
    active: boolean;
    type: 'ALL' | 'YEAR' | 'MONTH' | 'DAY';
}
