// flux.js
const getState = ({ getStore, getActions, setStore }) => {
  return {
      store: {
          contacts: [],
      },
      actions: {
          createAgenda: async () => {
              try {
                  const response = await fetch('https://playground.4geeks.com/contact/agendas/Joseblue11', {method: "POST"});
                  if (!response.ok) {
                      throw new Error('Error, no se pudo Crear la agenda');
                  }
                  const data = await response.json();
                  console.log(data)
              } catch (error) {
                  console.error('Error:', error);
              }
          },
          getData: async () => {
            try {
                const response = await fetch('https://playground.4geeks.com/contact/agendas/Joseblue11');
                if (!response.ok) {
                    throw new Error('Error, no se pudo obtener los datos de contacto');
                }
                const data = await response.json();
                setStore({ contacts: data.contacts });
            } catch (error) {
                console.error('Error:', error);
            }
        },


          deleteUser: async (contactId) => {
              try {
                  const response = await fetch(`https://playground.4geeks.com/contact/agendas/Joseblue11/contacts/${contactId}`, {
                      method: 'DELETE'
                  });
                  if (!response.ok) {
                      throw new Error('Error, no se pudo eliminar el Contacto');
                  }
                  const store = getStore();
                  const UpdatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                  setStore({ contacts: UpdatedContacts });
              } catch (error) {
                  console.error('Error:', error);
              }
          }
      }
  };
};

export default getState;

