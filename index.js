const request = require('request');

const PATH = '/nrc/control_0';
const URN = 'panasonic-com:service:p00NetworkControl:1';
const PORT = '55000';

const makeRequest = (ipAddress, actions) => {

  const constructRequest = (action) => {
    return {
      method: 'POST',
      uri: `http://${ipAddress}:${PORT}${PATH}`,
      headers: {
        'Content-Type': `text/xml; charset="utf-8"`,
        'SOAPACTION': `"urn:${URN}#X_SendKey"`
      },
      body: `
  <?xml version='1.0' encoding='utf-8'?>
  <s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/' s:encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'>
    <s:Body>
      <u:X_SendKey xmlns:u='urn:${URN}'>
        <X_KeyEvent>NRC_${action}-ONOFF</X_KeyEvent>
      </u:X_SendKey>
    </s:Body>
  </s:Envelope>
      `.trim()
    };
  };

  // Convert action to an array of actions.
  actions = actions.split(',');

  // For each action, fire a request.
  let completedRequests = 0;
  const promise = new Promise((fulfill, reject) => {
    actions.map(currentAction => {
      request(constructRequest(currentAction), (err, res) => {
        completedRequests++;
        if (err || res.statusCode !== 200) {
          reject(err);
          return;
        }
        if (completedRequests === actions.length) {
          fulfill('Success!');
        }
      });
    });
  });
  return promise;
};

module.exports = (ip, code) => makeRequest(ip, code.toUpperCase());
