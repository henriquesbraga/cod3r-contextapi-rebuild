import React, { createContext, useReducer } from 'react';
import users from '../data/Users';



//Estado inicial
const initialState = {users};


//cria o contexto
const UsersContext = createContext({});

//Acções
const actions = {

  //cria um user
  createUser(state, action){
    const user = action.payload;
    user.id = Math.random();
    return{
      ...state,
      users:[...state.users, user]
    }
  },

  updateUser(state, action){
    const updated = action.payload
    return{
      ...state,
      users: state.users.map((u) => u.id === updated.id ? updated : u)
    }
  },

  deleteUser(state, action){
    const user = action.payload; //pega o user
    return{
      //...state, //opcional pois so temos um atributo. Se tiver mais elemenbtos no estado, precisa clonar os atributos para não sobrescrever o estado
      users: state.users.filter((u) => u.id !== user.id)  //se não for diferente, será deletadod
    }
  }
}



export const UsersProvider = (props) => {

  //para usar useReducer
  //esta tudo dentro do state: state.users 
  //Função para evoluir o estado
  function reducer(/*Lista de usuarios na sua ultima versão*/state, action){

    const fn = actions[action.type];  // para acessar a propriedade de um objeto a partir de uma string
    return fn ? fn(state, action) /*se chamar a função, retorna o novo state*/ : state /*retorna o estado atual*/;
  }
  
  //dispatch: passar para dendtro do reducer para saber a função que precisa ser chamada para executar uma determinada ação
  const [state, dispatch] = useReducer(reducer, initialState)


  return (
    //Provê o objeto a partir do provider.
    //Aplicação deve ser inserida dentro 
    <UsersContext.Provider value={{
        //Dados iniciais
        state,    //estado
        dispatch  //para invocar um evento
    }}>
      {props.children}
    </UsersContext.Provider>
  );



}

export default UsersContext;
