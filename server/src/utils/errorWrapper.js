function errorWrapper(err) {
  let status;
  let errors = {};

  err.map((x) => {
    errors[x.path] = x.message || x.msg;
    status = x.status;
  });

  console.log(errors);
  return { status, errors };
}

function mapperStatus(err, status) {
  let result = err.map((err) => ({ ...err, status }));
  return result;
}

module.exports = {
  errorWrapper,
  mapperStatus
};
