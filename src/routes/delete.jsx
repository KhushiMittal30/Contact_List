import react from "react"
import { deleteContact } from "../contacts";
import { redirect } from "react-router-dom";


// Note the action points to "destroy". Like <Link to>, <Form action> can take a relative value. Since the form is 
// rendered in contact/:contactId, then a relative action with destroy will submit the form to contact/:contactId/destroy 
// when clicked.

// Add a form, add an action, React Router does the rest.

export async function action({params}) {
    // throw new error("dang");
  await deleteContact(params.contactId);
  return redirect("/");
}

