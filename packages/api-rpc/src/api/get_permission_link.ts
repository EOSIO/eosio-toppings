var request = require("request");

const get_permission_link = async query => {
  try {
    // console.log("config: ", config);
    // console.log("query: ", query);
    const { endpoint, account_name, records_count } = query;

    const limit = Math.min(parseInt(records_count) || 100, 100);

    var options = {
      "json": true,
      "code": "eosio.authlink",
      "scope": account_name,
      "table": "authlinks",
      "table_key": "",
      "lower_bound": "",
      "upper_bound": "",
      "limit": limit,
      "key_type": "",
      "index_position": "",
      "encode_type": "dec",
      "reverse": false,
      "show_payer": false
    };

    console.log("options: ", options);

    var req = new Promise(function (resolve, reject) {
      request.post({ url: endpoint + "/v1/chain/get_table_rows", json: true, body: options }, function (err, resp, body) {
        if (err) {
          reject(err);
        } else {
          // console.log("body: ", body);
          resolve(body.rows);
        }
      });
    });

    return req;
  } catch (error) {
    console.error(
      'Caught exception in get all permissions query: ',
      error.stack
    );
    return [];
  };
};

module.exports = get_permission_link;
