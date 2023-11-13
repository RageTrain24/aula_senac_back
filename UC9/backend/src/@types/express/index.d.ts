declare namespace Express{
    export interface Request {
        user_id: string
    }
}

//escrevendo outra vez um middleware de Request do Express adicionando o atributo "user_id" enquanto string.
//ir ao tsconsig.json para habilitar o presente diretório (linha 34):
// "typeRoots": [
//     "./src/@types"
//   ],    

