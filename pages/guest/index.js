import GuestLayout from "../../components/layout/GuestLayout";
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';

function Guest() {
  return (
    <GuestLayout>
      {/* <h1 style={{ paddingTop: "20px", paddingLeft: "200px" }}>
       Logged In as Guest.
      </h1>
      <h1 style={{ paddingTop: "20px", paddingLeft: "200px" }}>
       Your email is not verified yet. 
      </h1> */}
<div >
<h1 class="guest-page" style ={{ paddingTop: "50px"}} >Welcome Guest. 
Your Email is not verified yet. Please contact Admin</h1>

</div>
      
    </GuestLayout>
  );
}

export default Guest;
