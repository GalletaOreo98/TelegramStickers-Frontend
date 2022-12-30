export interface IPack {
    name: string,
    url: string,
    data: IPackData[]
}

export interface IPackData {
    name: string,
    url: string,
    download_url: string
    loaded: boolean
}
