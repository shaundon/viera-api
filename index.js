const request = require('request');

const PATH = '/nrc/control_0';
const URN = 'panasonic-com:service:p00NetworkControl:1';
const PORT = '55000';

const makeRequest = (ipAddress, action) => {

  const constructBody = (action) => {
    return `
<?xml version='1.0' encoding='utf-8'?>
<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/' s:encodingStyle='http://schemas.xmlsoap.org/soap/encoding/'>
  <s:Body>
    <u:X_SendKey xmlns:u='urn:${URN}'>
      <X_KeyEvent>NRC_${action}-ONOFF</X_KeyEvent>
    </u:X_SendKey>
  </s:Body>
</s:Envelope>
    `.trim();
  };

  const requestInfo = {
    method: 'POST',
    uri: `http://${ipAddress}:${PORT}${PATH}`,
    body: constructBody(action),
    headers: {
      'Content-Type': `text/xml; charset="utf-8"`,
      'SOAPACTION': `"urn:${URN}#X_SendKey"`
    }
  };

  const promise = new Promise((fulfill, reject) => {
    request(requestInfo, (err, res) => {
      if (err || res.statusCode !== 200) {
        reject(err);
        return;
      }
      fulfill('Success!');
    });
  });
  return promise;
};

module.exports = (ip, code) => makeRequest(ip, code.toUpperCase());
