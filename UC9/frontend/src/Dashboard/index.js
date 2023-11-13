import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiLocal from '../API/apiLocal/api'


export default function Dashboard() {

    const navigation = useNavigate()

    function handleSair (){
        localStorage.removeItem('@tklogin2023')
        navigation('/')
        toast.warning('O usuário foi deslogado com sucesso!')
    }

    useEffect(() => {
        const iToken = localStorage.getItem('@tklogin2023')
        const token = JSON.parse(iToken)
        // console.log(token)
        if (!token) {
            navigation('/')
            return
        } else if (token) {
            async function verificaToken(){
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}` //execução do JSX, a constante
                    }
                })
                if (resposta.data.dados){
                    navigation('/')
                    return
                }
                console.log(resposta)
            }
            verificaToken()
        }
    })



    return (
        <div>
            <h1>Dashboard</h1>

            <Link to='/Produtos'>Cadastrar Produtos</Link> <br />
            <Link to='/Categorias'>Cadastrar Categorias</Link> <br />

            <button onClick={handleSair}> Sair </button>
        </div>
    )
}