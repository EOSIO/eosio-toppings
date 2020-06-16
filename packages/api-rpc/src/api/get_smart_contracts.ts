var request = require("request");

const config = require('./configuration').config;

const get_smart_contracts = async query => {
   try {
      // console.log("config: ", config);
      // console.log("query: ", query);

      const { smart_contract_name, records_count } = query;
      const limit = Math.min(parseInt(records_count) || 100, 100);

      var upper_bound = "";
      // calculate the upper_bound
      if (typeof smart_contract_name !== 'undefined') {
         upper_bound = smart_contract_name + 'z'.repeat(12 - smart_contract_name.length);
      }

      var options = {
         "json": true,
         "code": "eosio.contrs",
         "scope": "eosio",
         "table": "contracts",
         "table_key": "",
         "lower_bound": smart_contract_name,
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
         request.post({ url: config.endpoint + "/v1/chain/get_table_rows", json: true, body: options }, function (err, resp, body) {
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

module.exports = get_smart_contracts;
