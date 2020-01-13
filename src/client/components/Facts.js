import React from "react";

import { Jumbotron, Container, Card } from "react-bootstrap";

//LOCAL
import { getFacts } from "../services/fact";

//REACT-ICONS
import { FaRegCommentDots } from "react-icons/fa";

class Facts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: []
    };
  }

  async componentDidMount() {
    try {
      const facts = await getFacts();
      console.log(facts);
      this.setState({
        facts
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { facts } = this.state;

    const fact = facts.map(elem => {
      return (
        <Container>
          <Card>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {elem.fact} </p>
              </blockquote>
            </Card.Body>
            <Card.Footer as="cite">
              #{elem.id}
              <FaRegCommentDots /> {elem.sourceDisplayName}
            </Card.Footer>
          </Card>
        </Container>

        /* <Container>
            <Jumbotron>
                <blockquote className="blockquote mb-0">
                <p> {elem.fact} </p>
                </blockquote>
                #{elem.id}
                <FaRegCommentDots /> 
                {elem.sourceDisplayName}
            </Jumbotron>
        </Container> */
      );
    });

    return (
      <Container>
        <h3>Facts</h3>
        {fact}
      </Container>
    );
  }
}

export default Facts;
