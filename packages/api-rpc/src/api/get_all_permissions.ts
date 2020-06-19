var request = require("request");

const get_all_permissions = async (query: {
  endpoint: string,
  account_name: string,
  records_count: string
}) => {
   try {
      // console.log("config: ", config);
      // console.log("query: ", query);

      const { endpoint, account_name, records_count } = query;
      const limit = Math.min(parseInt(records_count) || 200, 200);

      var upper_bound = "";
      // calculate the upper_bound
      if (typeof account_name !== 'undefined') {
         upper_bound = account_name + 'z'.repeat(12 - account_name.length);
      }

      var options = {
         "json": true,
         "code": "eosio.accnts",
         "scope": "eosio",
         "table": "accounts",
         "table_key": "",
         "lower_bound": account_name,
         "upper_bound": upper_bound,
         "limit": limit,
         "key_type": "",
         "index_position": "",
         "encode_type": "dec",
         "reverse": false,
         "show_payer": false
      };

      // console.log("options: ", options);

      const result = await new Promise(function (resolve, reject) {
         request.post({ url: endpoint + "/v1/chain/get_table_rows", json: true, body: options }, function (err: any, resp: any, body: any) {
            if (err) {
               reject(err);
            } else {
               // console.log("body: ", body);
               resolve(body.rows);
            }
         });
      });

      return result;
   } catch (error) {
      console.error(
         'Caught exception in get all permissions query: ',
         error.stack
      );
      return [];
   };
};

export default get_all_permissions;
