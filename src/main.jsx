import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Root, {loader as rootLoader , action as rootAction}  from "./routes/root.jsx"
import Error_page from './error_page.jsx'
import Contact ,{loader as contactLoader , action as favouriteAction} from './routes/contact.jsx'
import EditContact,{action as editAction} from './routes/edit.jsx'
import { action as deleteAction } from './routes/delete.jsx'
import Index from './routes/index.jsx'


const router = createBrowserRouter([
  { 
    path: "/",
    element: <Root />,
    loader:rootLoader,
    errorElement: <Error_page />,
// When you click on the <Link to="/contacts/1">, React Router updates the URL without refreshing the page.
// The Contact component is rendered based on the matched route (/contacts/1).
// The getContact(id) function is called with the contact's ID (1), which retrieves the contact data from the local storage or cache.
// If there is any delay in fetching the contact, the fakeNetwork() function simulates that delay, mimicking real-world server behavior.
// Once the contact data is retrieved, it is rendered in the Contact component.
    children: [
      {
      errorElement:<Error_page/>,
      children:[
      {
        index:true,
        element:<Index />
    
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: favouriteAction
      },
      {
        path:"contacts/:contactId/edit",  //contacts/:contactId also worls but then update the same in the link to also 
        element:<EditContact />,
        loader:contactLoader,
        action:editAction,
      },
      {
        path:"/contacts/:contactId/destroy",
        action: deleteAction,
        errorElement:<div>Oops!!There is an error!</div>
        // loader:rootLoader,
      }]
  }],
    action: rootAction,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
