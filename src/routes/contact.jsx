import React from 'react'
import { Form , useLoaderData, useFetcher} from 'react-router-dom';
import { getContact,updateContact} from '../contacts';

export async function loader({params}){
    const contact  = await getContact(params.contactId)
    if(!contact){
        throw new Response("",{
            status:404,
            statusText:"Not found",
        })
    }
    return {contact};
    }

export async function action({request, params}){
    const formData = await request.formData();
    return updateContact(params.contactId,{
        favourite: formData.get("favourite") === "true",
    })
}

const Contact = () => {
   

    const {contact} = useLoaderData();


  return (
    <div id='contact'>
        <div>
            <img
            key={contact.avatar}
            src={contact.avatar ||
                `https://robohash.org/${contact.id}.png?size=200x200`}            
            />
        </div>
                
        <div>
            <h1>
             {contact.firstname || contact.lastname ? (
                <>
                {contact.firstname}{contact.lastname}
                </>
             ):(
                <i>No Name</i>
             )}{" "}
             <Favourite contact={contact} />
            </h1>

            {contact.twitter && (
                <p>
                    <a
                    target='_blank'
                    href={`https://twitter.com/${contact.twitter}`}                    
                    >
                    {contact.twitter}
                    </a>
                </p>
            )}
            {contact.notes && <p>{contact.notes}</p>}
        
        <div>
            <Form action="edit">
                <button>Edit</button>
            </Form>
            <Form 
            method="post"
            action="destroy"
            onSubmit={(event)=>{
                if(!confirm("Please confirm if you want to delete this record."))
                {event.preventDefault();}
                }}
            >
                <button type='submit'>Delete</button>
            </Form>
        </div>
    </div>    
</div>
  );
}

function Favourite({contact}){
    const fetcher = useFetcher();

const favourite = fetcher.formData
    ? fetcher.formData.get("favourite") === "true"
    : contact.favourite;

return(
  <fetcher.Form method='post'>
    <button 
     name="favourite"
     aria-label={
        favourite?"remove from favourite":"Add to favourites"
     }
     value={favourite ? "false" : "true"}
    >
        {favourite ? "★" : "☆"}
    </button>
  </fetcher.Form>
)
}

export default Contact

// Example of How the Contact Component Might Call getContact():
// Here’s how your Contact component might be using getContact() to fetch and display the contact:
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { getContact } from './contacts.js'; // Assuming the file path is correct

// const Contact = () => {
//   const { contactId } = useParams();
//   const [contact, setContact] = useState(null);

//   useEffect(() => {
//     const fetchContact = async () => {
//       const fetchedContact = await getContact(contactId);
//       setContact(fetchedContact);
//     };
//     fetchContact();
//   }, [contactId]);

//   if (!contact) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>{contact.firstname} {contact.lastname}</h1>
//       {/* Other contact details */}
//     </div>
//   );
// };
