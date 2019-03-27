import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import { Button, Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label } from 'reactstrap';

import { fetchStart, paramsSet } from './ActiondetailReducer';
import pathNameConsumer from 'helpers/pathname-consumer';
import { LoadingSpinner } from 'components';

const Actiondetail = (props) => {

  useEffect(()=>{
    let { router: { location: {pathname} } } = props;
    props.paramsSet({id: pathNameConsumer(pathname)});
    props.fetchStart();
  }, [])

  let { actiondetail: { isFetching, data } } = props;
  let { payload, error } = data;
  return (
    <>
      {/* { JSON.stringify(payload) } */}

      { error ? 
        <div className="text-center">
          <p className="text-danger">{JSON.stringify(error)}</p>
          <Button color="primary" onClick={props.pollingStart}>Click to Reload</Button>
        </div>
      : isFetching ? (
        <LoadingSpinner />
      ) : (
       payload.map((action, index) =>
        <Form key={index} className="form-horizontal">
          <FormGroup row className="mb-0">
            <Col xs="3">
              <Label><strong>Smart Contract Name</strong></Label>
            </Col>
            <Col xs="9">
              <p className="form-control-static">{action && action.act.account}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="3">
              <Label><strong>Action Type</strong></Label>
            </Col>
            <Col xs="9">
              <p className="form-control-static">{action && action.act.name}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="3">
              <Label><strong>Timestamp</strong></Label>
            </Col>
            <Col xs="9">
              <p className="form-control-static">{action && action.createdAt}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="3">
              <Label><strong>Transaction ID</strong></Label>
            </Col>
            <Col xs="9">
              <p className="form-control-static">{action && action.trx_id}</p>
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Col xs="3">
              <Label><strong>Actor</strong></Label>
            </Col>
            <Col xs="9">
              <p className="form-control-static">
                { action && (action.act && (action.act.authorization && 
                  action.act.authorization.map((auth, i) => (
                    auth.actor + (i > 0 && i < (action.act.authorization.length - 1) ? ", " : "")
                  )
                ))) }
              </p>
            </Col>
          </FormGroup>
        </Form>
      ))}
    </>
  );
}

export default connect(
  ({ actiondetailPage: { actiondetail }, router}) => ({
    actiondetail,
    router
  }),
  {
    fetchStart,
    paramsSet,
  }

)(Actiondetail);