import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state) => state.alerts);

  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((alert, index) => (
          <div className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
        ))}
    </Fragment>
  );
};

export default Alert;
