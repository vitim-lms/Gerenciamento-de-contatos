import { connection } from "../infra/connection";

//Tipos  (id? -> com ? sign. opcinal)

//Definição do modelo (entidade) User
export type User = {
    id? : number;
    name : string;
    email : string;
    password : string;
    create_at? : string;
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

export async function insert(user: User) {
   await connection.query('INSERT INTO usuario(nome, email, senha) VALUES ($1, $2, $3);', 
        [
            user.name,
            user.email,
            user.password,
        ]
    );
}

//recupera todos os usuarios do bd
export async function getAll() {
    const { rows } = await connection.query('SELECT * FROM usuario;');
    return rows;
}

//Atualiza todos os dados do bd
export async function update(user: User) {
    await connection.query('UPDATE usuario SET name=$1, email=$2, password=$3, role=$4 WHERE id=$5;',
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
    await connection.query('DELETE FROM usuario WHERE id=$1', [id]);
} 

//Busca um usuario no banco pelo seu ID
export async function getById (id:string) {
    const {rows} = await connection.query (
        'SELECT * FROM usuario WHERE id=$1', 
        [id]
    );
    return rows[0];
  }

export async function getByEmail (Email:string) {
    const {rows} = await connection.query (
        'SELECT * FROM usuario WHERE email=$1', 
        [Email]
    );
    return rows[0];
  }