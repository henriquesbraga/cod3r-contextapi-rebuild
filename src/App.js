import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { UsersProvider } from './context/UsersContext';
import { Button, Icon } from 'react-native-elements';


//Telas
import UserList from './views/UserList'
import UserForm from './views/UserForm'



//Cria a navegação
const Stack = createStackNavigator();

export default (props) => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList" screenOptions={screenOptions}>
          
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
              return {
                title: "Lista de usuários",
                //Coloca um botão do lado direito no header
                headerRight: () => (
                  <Button
                    buttonStyle={{backgroundColor: '#282A36'}}
                    icon={<Icon name="add" size={25} color="#FFF"
                      onPress={() => { navigation.navigate("UserForm") }}
                    />}
                  />
                )

              }
            }}
          />

          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{ title: "Formulário de usuários" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
};


const screenOptions = {
  //Cor do background
  headerStyle: {
    backgroundColor: '#282A36'
  },

  //Cor da fonte do titulo
  headerTintColor: '#fff',

  //Estilo do texto do header
  headerTitleStyle: {
    //fontWeight: 'bold'
  },
  
 
}