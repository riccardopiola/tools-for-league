// @flow
import React from 'react';

const ErrorPage = (props: { message?: string, changeRoute: (r: string, msg?: string) => void }) => {
  console.error(props.message);
  return (
    <div className="container">
      <div className="buttons-container">
        <button
          className="top-button"
          onClick={() => props.changeRoute('home')}
        >
          BACK
        </button>
      </div>
      <div className="error-message-container">
        <p>
          <strong>ERROR: </strong>{props.message}
        </p>
      </div>
    </div>
  );
};

ErrorPage.defaultProps = {
  message: ''
};

export default ErrorPage;
