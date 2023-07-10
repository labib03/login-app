type DataResponse = {
    _id?: string
    username?: string
    email?: string
    profile?: string
    __v?: number
}

export interface ResponseFetchType {
    status?: string | undefined
    message?: string | undefined
    username?: string | undefined
    token?: string | undefined
    data?: DataResponse | undefined
    code?: string | undefined
}

