import * as React from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import Link from "./Link";

interface LinkTableProps {
  postList: [];
  _subscribeToNewLinks: () => void;
}

export interface LinksProps {
  id: string;
  desciption: string;
  url: string;
}

class LinkTable extends React.Component<LinkTableProps> {
  componentDidMount() {
    this.props._subscribeToNewLinks();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>URL</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.postList.map((link: LinksProps, index) => {
                  return <Link key={link.id} link={link} index={index} />;
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LinkTable;
