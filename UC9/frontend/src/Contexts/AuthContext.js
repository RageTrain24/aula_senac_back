import { createContext, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../API/apiLocal/api'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setuser] = useState('')

    const isAutenthicated = !!user

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)
    if(!token){
        // console.log(iToken)
    }

    async function loginToken() {
        try {
            const resposta = await api.get('/ListarUsuarioToken', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            console.log(resposta)
        } catch (err) {

        }
    }

    async function signIn({ email, password }) {
        try {
            const resposta = await api.post('/LoginUsuarios', {
                email,
                password
            })
            return resposta

        } catch (err) {
            toast.error("Erro ao Fazer Login")
        }
    }
    return (
        <AuthContext.Provider value={{ signIn, loginToken }}>
            {children}
        </AuthContext.Provider>
    )
}