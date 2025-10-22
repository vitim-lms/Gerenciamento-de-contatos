import { connection } from "../infra/connection";


//Tipos
//definição de modelo (entidade) User
export type User = {
  id?: number,
  name: string;
  email: string;
  password: string;
  created_at?: string;
  //esses são os atributos que serão apresentados no banco de dados.
}



//Funçoes de conexão com banco
/*CRUD -> 
        C -> CREATE (inserir)
        R -> READ (leitura)
        U -> UPADATE (atualizar)
        D -> DELETE (apagar/deletar/excluir)
*/


//função  que insere um usuario na tabela usuario 
export async function insert(user: User) {
  //Dentro do .query() colocamos o codigo SQL 
  //Se o código SQL precisar de dados via 
  //Esses dados são passados usando $1 $2
  //Os valores do $1 $2 etc são trocados pelos valores 
  //que são passados no segundo parametro do .query()
  //ex: query('$1, $2,) (['Valore1', 'valor2'])
  await connection.query('INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4);',
    [
      user.name,
      user.email,
      user.password
    ]
  );
}

// função que recupera todos os usuarios do BD
export async function getAll() {
  const { rows } = await connection.query('SELECT * FROM users;');
  return rows;
}

//Função que atualiza dados de um usuario pelo ID.
export async function update(user: User) {
  await connection.query('UPDATE users SET name=$1, email=$2, password$3, role$4 WHERE id=$5 ',
    [
      user.name,
      user.email,
      user.password,
      user.id
    ]
  );
}
