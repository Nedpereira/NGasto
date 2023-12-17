export type cardsProps = {
    tag: any;
    descricao: string;
    valor: number;
    id: number;
};

export type userProps = {
    [x: string]: any;
    name: string;
    photo: string | null;
}

export type monthYearProps = {
    monthYear: any;
}