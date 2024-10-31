import React from 'react';
import ReactDOM from 'react-dom/client';
import "@shared/scss/style.scss";
import { Provider } from 'react-redux';
import store from '@config/store';
import { App } from '@app';
import { stringToDOB } from './shared/utils/common-function';
import { ToastContainer } from 'react-toastify';
const ZeroPrefix = (number) => {
  let PrefixedNumber;
  if (parseInt(number) < 10 && !`${number}`.startsWith("0")) {
    PrefixedNumber = `0${number}`;
  } else {
    PrefixedNumber = `${number}`;
  }
  return PrefixedNumber;
};
Date.prototype.isValidDate = function () {
  return this.getTime() === this.getTime();
};
Date.prototype.dateFormat = function () {
  let day = ZeroPrefix(this.getDate());
  let month = ZeroPrefix(this.getMonth() + 1);
  let year = `${this.getFullYear()}`;
  return { day, month, year }
};

String.prototype.isValidDateString = function () {


  let currentDate = new Date(stringToDOB(this));
  if (currentDate == "Invalid Date" || this.length !== 8) {
    return false
  }
  const [year, month, day] = stringToDOB(this).split("-");
  const [matchday, matchmonth, matchyear] = [ZeroPrefix(currentDate.getDate()), ZeroPrefix(currentDate.getMonth() + 1), `${currentDate.getFullYear()}`]
  return day == matchday && matchmonth == month && year === matchyear

};



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <App />
    </Provider>
  </React.StrictMode>,
);
