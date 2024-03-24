const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');
module.exports.getOverview = catchAsync(async (req, res) => {
  res.status(200).render('main');
});

module.exports.getLocationSearch = catchAsync(async (req, res, next) => {
  let nameCity;
  if (req.query.q) {
    nameCity = req.query.q;
  } else {
    let { QueryType } = req.body;
    nameCity = QueryType;
  }
  const responseForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?q=${nameCity}&key=${process.env.API_KEY}&days=4`
  );
  const responseCurrent = await fetch(
    `http://api.weatherapi.com/v1/current.json?q=${nameCity}&key=${process.env.API_KEY}`
  );
  const data = {};
  const forecast = await responseForecast.json();
  const current = await responseCurrent.json();
  data.forecast = forecast;
  data.current = current;
  res.status(200).render('overview', data);
});

module.exports.getCurrentLocation = catchAsync(async (req, res) => {
  const QueryType = 'auto:ip';
  const responseForecast = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?q=${QueryType}&key=${process.env.API_KEY}&days=4`
  );
  const responseCurrent = await fetch(
    `http://api.weatherapi.com/v1/current.json?q=${QueryType}&key=${process.env.API_KEY}`
  );
  const data = {};
  const forecast = await responseForecast.json();
  const current = await responseCurrent.json();
  data.forecast = forecast;
  data.current = current;
  res.status(200).render('overview', data);
});

module.exports.sendEmail = async (req, res) => {
  try {
    const emails = req.cookies.emails ? req.cookies.emails.split(',') : [];
    for (const email of emails) {
      await new Email(email).sendWelcome();
    }
    res.status(200).json({
      status: 'success',
      message: 'Emails sent successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports.registerEmail = async (req, res) => {
  const { email } = req.body;
  // Get the current emails from the cookie
  const emails = req.cookies.emails ? req.cookies.emails.split(',') : [];
  // Add the new email to the array if it does not exist
  if (!emails.includes(email)) {
    emails.push(email);
    // Save the array back to the cookie
    res.cookie('emails', emails.join(','), { maxAge: 900000, httpOnly: true });
  }
  await new Email(email).sendWelcome();
  res.status(200).json({
    status: 'success',
    message: 'Email registered successfully',
  });
};

module.exports.unSubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    // Get the current emails from the cookie
    const emails = req.cookies.emails ? req.cookies.emails.split(',') : [];
    // Remove the email from the array
    const index = emails.indexOf(email);
    if (index > -1) {
      emails.splice(index, 1);
      // Save the array back to the cookie
      res.cookie('emails', emails.join(','), { maxAge: 900000, httpOnly: true });
    }
    res.status(200).json({
      status: 'success',
      message: 'Unsubscribed successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
