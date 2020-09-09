var request = require("request");

const get_smart_contracts = async (query: {
  endpoint: string,
  smart_contract_name: string,
  records_count: string
}) => {
   try {
      // console.log("config: ", config);
      // console.log("query: ", query);

      const { endpoint, smart_contract_name, records_count } = query;
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

export default get_smart_contracts;
