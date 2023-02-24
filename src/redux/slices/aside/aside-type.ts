export type Asides = {
    name: string, path: string, id: number
}

export interface AsideSliceState {
    asides: Asides[],
    activeNumber: number
}