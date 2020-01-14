//plugins
import React from "react";

//Bootstrap components
import { Container, Card } from "react-bootstrap";

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
      this.setState({
        facts
      });
    } catch (error) {
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
              <FaRegCommentDots /> {elem.sourceDisplayName}
            </Card.Footer>
          </Card>
        </Container>
      );
    });

    return (
      <Container>
        <h2>Facts</h2>
        {fact}
      </Container>
    );
  }
}

export default Facts;
