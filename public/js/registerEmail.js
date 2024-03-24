import axios from 'axios';
import { showAlert } from './alert';
export const registerEmail = async (email) => {
  console.log('hi from registerEmail');
  try {
    const res = await axios({
      method: 'POST',
      url: '/subscribed-email',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Register email Daily weather success!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const sendEmail = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/send-email',
    });
    if (res.data.status === 'success') {
      showAlert('success', 'send email Daily weather success!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
