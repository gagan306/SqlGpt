




import Card from 'react-bootstrap/Card';

function BodyOnlyExample() {
  return (
    <Card style={{ width: '18rem', marginLeft: '70px' , border: "2px solid gray" , marginTop: '90px',borderRadius: '20px'}}>
      <Card.Body>
       
       
        <Card.Text>
           card's content.
        </Card.Text>
        <Card.Link href="#" >Open Chat</Card.Link>
        
      </Card.Body>
    </Card>
  );
}

export default BodyOnlyExample;