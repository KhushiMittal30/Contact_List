import react, { useEffect } from "react";
import reactDom from "react-dom";
import { Outlet ,Link, useLoaderData, Form, redirect  , NavLink, useNavigation , useSubmit, replace } from "react-router-dom";
import {getContacts,createContact} from "../contacts";


export async function loader({request}){
const url = new URL (request.url);
const q = url.searchParams.get("q");
const contacts = await getContacts(q);
return {contacts,q};
}

export default function Root(){

  const {contacts,q}= useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

  useEffect(()=>{
    document.getElementById("q").value=q
  },[q]);

  return(
<>
<div id="sidebar">
  <h1>My Contacts</h1>
<div>
<Form id="search-form" role="search">
  <input
  id="q"
  placeholder="search"
  name="q"
  type="search"
  aria-label="Search Contacts"
  defaultValue={q}
  onChange={(event)=>{
    const isFirstSearch = q ==null;
    submit(event.currentTarget.form,{replace:!isFirstSearch})
  }}
  className={searching?"loading":""}
  />
  <div
  aria-hidden
  hidden={!searching}
  id="search-spinner"
  />
  <div
  className="sr-only"
  aria-live="polite"
  ></div>
</Form>
<Form method="post">
  <button type="submit">New</button>
</Form>
</div>
<nav>
  { contacts.length ? (
  <ul>{contacts.map( (contact) => (
    <li key={contact.id}>
      <NavLink to={`contacts/${contact.id}`} className={({isActive , isPending})=>(
        isActive?"active":isPending?"pending":" "
      )}>
      {contact.firstname || contact.lastname ? (
        <>
        {contact.firstname} {contact.lastname}
        </>):(
        <>
        <i>No Name</i>
        </>)}{" "}
        {contact.favourite && <span>★</span>}
      </NavLink>
    </li>
  ))}
  </ul>
):(<p><i>No Contacts</i></p>)}
</nav>
</div>
<div id='detail'
className={navigation.state === "loading"?"loading":""}>
  <Outlet/>
</div>
</>
)}

// export async function loader(){
//   const contacts = await getContacts();
//   return {contacts};
// }

export async function action(){
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}