import React from 'react';
import Loading from '../Loading/LoadingIndicator';
import './contactlist.css';

const ConatctList = props => {

  return (
    <section className="list">
      <h2>Loaded Contact Details</h2>
      {props.isLoading && <Loading />}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action Buttons</th>
          </tr>
        </thead>
        <tbody>
          {props.details.map(ig => (
            <tr key={ig.id} >
              <td style={{ marginTop: '10px' }}>{ig.name}</td>
              <td style={{ marginTop: '10px' }}>{ig.email}</td>
              <td style={{ marginTop: '10px' }}>{ig.phone}</td>
              <td><button className="btn btn-outline-info" onClick={() => { props.onEdit(ig.id) }} style={{ color: 'blue' }}>Edit </button>
                <button className="btn btn-outline-info" onClick={() => { props.onDelete(ig.id) }} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ConatctList;
