export interface Paystackoptions{
    key: string
    email: string
    firstname: string
    lastname: string
    channels: string[] | unknown[]
    amount: number
    access_code: string
    ref: string
    callback: Function
    onClose: Function
    metadata: object
    currency: string
    // plan: string
    // quantity: string
    // subaccount: string
    // split: object | null
    // split_code: string
    transaction_charge: number
    bearer: string
    container?: string
}