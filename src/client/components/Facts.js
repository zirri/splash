//plugins
import React from "react";

//Bootstrap components
import { Container, Card } from "react-bootstrap";

//LOCAL
import { getFacts } from "../services/fact";
import Errorview from './Errorview.js'

//REACT-ICONS
import { FaRegCommentDots } from "react-icons/fa";

class Facts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: [],
      error: null
    };
  }

  async componentDidMount() {
    try {
      const facts = await getFacts();
      if(facts.error){throw new Error(facts.error)}
      this.setState({
        facts
      });
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  render() {
    const { facts, error } = this.state;

    if(error){
      return(
        <Errorview error={error}/>
      )
    }

    const fact = facts.map(elem => {
      return (
        <Container key={elem.id}>
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
