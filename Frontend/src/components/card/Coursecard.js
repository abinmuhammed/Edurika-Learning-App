import React from 'react'
import Card from 'react-bootstrap/Card';

function Coursecard() {
  return (

    <Card border="warning" style={{ width: '18rem' }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Warning Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>

    )
}

export default Coursecard