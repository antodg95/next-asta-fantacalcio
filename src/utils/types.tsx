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

export type TeamFullInfo = {
    creditsLeft: number,
    teamId: number,
    teamName: string,
    D: number,
    C: number,
    A: number,
}

export type PlayerFullInfo = {
    idFantacalcio: number,
    name: string,
    role: string,
    squadra: string,
    price: number,
    idTeam: number
}
