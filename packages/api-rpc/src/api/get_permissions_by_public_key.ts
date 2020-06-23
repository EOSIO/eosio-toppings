var request = require("request");

const get_permissions_by_public_key = async (query: {
  endpoint: string,
  public_key: string,
  records_count: number
}) => {
  try {
    // console.log("query: ", query);
    const { endpoint, public_key, records_count } = query;

    const limit = Math.min(records_count || 100, 100);

    var scopeStr = "";
    var keyseg = "";

    // calculate the lower bound and upper bound
    if (typeof public_key !== 'undefined' && public_key.length >= 7) {
      if (public_key.substr(0, 3) == "EOS") {
        keyseg = public_key.substr(3);
      } else if (public_key.substr(0, 7) == "PUB_R1_" || public_key.substr(0, 7) == "PUB_WA_") {
        keyseg = public_key.substr(7);
      } else {
        // not supported key format
        // TODO: may support PUB_K1_ by adding key format converting
        keyseg = "";
      }
    }

    if (keyseg != "" && keyseg.length >= 8) {
      // get the keyseg 8 bytes, convert it to integer
      var scope = BigInt(0);
      for (var i = 0; i < 8; ++i) {
        scope = (scope * BigInt(256)) + BigInt(keyseg.charCodeAt(i));
        // console.log("i: ", i, " scope: ", scope);
      }
      scopeStr = scope.toString();
    } else {
      // failure, the key is not recognized
      return [];
    }

    var options = {
      "json": true,
      "code": "eosio.accnts",
      "scope": scopeStr,
      "table": "pubkeys",
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

    // console.log("options: ", options);

    var req = new Promise(function (resolve, reject) {
      request.post({ url: endpoint + "/v1/chain/get_table_rows", json: true, body: options }, function (err: any, resp: any, body: any) {
        if (err) {
          reject(err);
        } else {
          // console.log("body: ", body);
          resolve(body.rows);
        }
      });
    });

    var result = req.then(function(res: any) {
      // res[0].keyseg = "comment";
      // console.log("then result: ", res);
      res = res.filter(function(value: any, index: any, array: any) {
        return value.keypermslist.some(function(value: any, index: any, array: any) {
          return value.key == public_key;
        });
      });

      res = res.map(function(value: any, index: any, array: any) {
        value.keypermslist = value.keypermslist.filter(function(value: any, inidex: any, array: any) {
          return value.key == public_key;
        });
        return value;
      });

      // console.log("res: ", res);

      return res;
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

export default get_permissions_by_public_key;
