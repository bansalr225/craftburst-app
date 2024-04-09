import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../CSS/text.css";

const FeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/hello/getFeeDetails')
      .then(response => {
        setFeeDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching fee details:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div>
        <h4>{feeDetails.studentName}</h4>
      </div>

      <div>
        <h5>{feeDetails.class}</h5>
      </div>

      <div className="container mt-5">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td><label style={{ color: 'grey', fontWeight: 'bold' }}>Total Fee:</label></td>
              <td>{feeDetails.totalFee}</td>
              <td><label style={{ color: 'grey', fontWeight: 'bold' }}>Remaining Fee:</label></td>
              <td style={{ color: 'red'}}>{feeDetails.remainingFee}</td>
            </tr>
            <tr>
              <td><label style={{ color: 'grey', fontWeight: 'bold' }}>Frequency:</label></td>
              <td>{feeDetails.frequency}</td>
            </tr>
          </tbody>
        </table>

        <h5>Fee history</h5>
        <ul>
          {feeDetails.paymentHistory && feeDetails.paymentHistory.length > 0 ? (
            feeDetails.paymentHistory.map((payment, index) => (
              <li style={{ color: 'grey'}} key={index}>{`${payment.amountPaid} paid on ${payment.paymentDate}`}</li>
            ))
          ) : (
            <li>No payment history available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FeeDetails;
