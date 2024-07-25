//env variables

const url = process.env.EXPO_PUBLIC_PAYSTACK_URL!
const secretKey = process.env.EXPO_PUBLIC_PAYSTACK_KEY!



//fetch all banks

export const fetchAllBanks = async() => {
    const banks = await fetch(`${url}/bank`)
    const data = await banks.json()

  return data.data
}


//bank names

export const getBankByCode = async(code:string) => {
    const response = await fetchAllBanks().then((res) => {
        const banks = res.filter((bank: any) => (bank.code === code))
        return banks
    });

    return response
}

//validate account number 

export const validateAccountNumber = async(accountNumber:string, bankCode:string) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + secretKey
        },
        
    }

    const res = await fetch(`${url}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options)

    const data = await res.json()

    return data
}