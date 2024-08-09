export type CsvPlayer = {
    idFantacalcio: number,
    name: string,
    role: string,
    team: string,
}

export type Team = {
    id: number,
    name: string,
}

export type PlayerHistory = {
    name: string,
    role: string,
    idFantacalcio: number,
    squadra: string,
    price: number,
    idTeam: number,
    teamName: string
}