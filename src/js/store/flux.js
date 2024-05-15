// flux.js
const getState = ({ getStore, getActions, setStore }) => {
  return {
      store: {
          Users: [],
      },
      actions: {
          getData: async () => {
              try {
                  const response = await fetch('https://playground.4geeks.com/contact/agendas/Joseblue11');
                  if (!response.ok) {
                      throw new Error('Error, no se pudo obtener los datos de contacto');
                  }
                  const data = await response.json();
                  setStore({ Users: data.Users });
              } catch (error) {
                  console.error('Error:', error);
              }
          },
          deleteUser: async (UserId) => {
              try {
                  const response = await fetch(`https://playground.4geeks.com/contact/agendas/Joseblue11/contacts/${UserId}`, {
                      method: 'DELETE'
                  });
                  if (!response.ok) {
                      throw new Error('Error, no se pudo eliminar el Contacto');
                  }
                  const { store, actions } = getStore();
                  const UpdatedUsers = store.Users.filter(User => User.id !== UserId);
                  setStore({ Users: UpdatedUsers });
              } catch (error) {
                  console.error('Error:', error);
              }
          }
      }
  };
};

export default getState;

