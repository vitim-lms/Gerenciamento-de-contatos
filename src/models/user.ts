import { UserRole } from "../enums/user_role";
import { connection } from "../infra/connection";

//Tipos  (id? -> com ? sign. opcinal)

//Definição do modelo (entidade) User
export type Users = {
    id? : number;
    name : string;
    email : string;
    password : string;
}

//Funções de conexão com o banco
/*
CRUD -> C -> CREATE (inserir)
        R -> READ (leitura)
        U -> UPDATE (atualizar)
        D -> DELETE (apagar/deletar/excluir)
    query -> retorna uma promessa"
    await -> aguarda ela se comprir
*/

export async function insert(user: Users) {
   await connection.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3);', 
        [
            user.name,
            user.email,
            user.password,
        ]
    );
}

//recupera todos os usuarios do bd
export async function getAll() {
    const { rows } = await connection.query('SELECT * FROM users;');
    return rows;
}

//Atualiza todos os dados do bd
export async function update(user: Users) {
    await connection.query('UPDATE users SET name=$1, email=$2, password=$3, WHERE id=$4;',
        [
            user.name,
            user.email,
            user.password,
            user.id
        ]
    );  
}

//Apaga um usuario no banco pelo o seu ID
export async function deleteById (id: string) {
    await connection.query('DELETE FROM users WHERE id=$1', [id]);
} 

//Busca um usuario no banco pelo seu ID
export async function getById (id:string) {
    const {rows} = await connection.query (
        'SELECT * FROM users WHERE id:$1', 
        [id]
    );
    return rows[0];
}

export async function getByEmail (email:string) {
    const {rows} = await connection.query (
        'SELECT * FROM users WHERE email=$1', 
        [email]
    );
    return rows[0];
}
export async function getByEmailAndPassword (email:string, password: string) {
    const {rows} = await connection.query (
        'SELECT * FROM users WHERE email=$1 AND password=$2', 
        [email, password]
    );
    return rows[0];
}

