type DataResponse = {
    _id: string
    username: string
    email: string
    profile: string
    __v: number
}

export interface ResponseFetchType {
    status: string
    message: string
    username: string
    token: string
    data?: DataResponse
    code: string
    email: string
}

