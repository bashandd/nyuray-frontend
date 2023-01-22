import GuestLayout from "../../components/layout/GuestLayout";

function Guest() {
  return (
    <GuestLayout>
      <Row justify="end" style={{ marginTop: "10px" }}>
        <Col span={4}>
          <Button type="primary">
            <a href="javascript:history.back()">Go Back</a>
          </Button>
        </Col>
      </Row>
      {/* <h1 style={{ paddingTop: "20px", paddingLeft: "200px" }}>
       Logged In as Guest.
      </h1>
      <h1 style={{ paddingTop: "20px", paddingLeft: "200px" }}>
       Your email is not verified yet. 
      </h1> */}
      <div>
        <h1 class="guest-page" style={{ paddingTop: "50px" }}>
          Welcome Guest. Your Email is not verified yet. Please contact Admin
        </h1>
      </div>
    </GuestLayout>
  );
}

export default Guest;
