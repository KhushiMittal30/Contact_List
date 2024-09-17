import { Form, useLoaderData, redirect, Navigate, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="firstname"
          defaultValue={contact?.firstname}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="lastname"
          defaultValue={contact?.lastname}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      {/* A <button type="button">, while seemingly redundant, is the HTML way of preventing a button from submitting its form. */}
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={()=>{
          navigate(-1);
        }}>Cancel</button> 
      </p>
    </Form>
  );
}

export async function action({request,params}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId,updates);
    return redirect(`/contacts/${params.contactId}`);
    }