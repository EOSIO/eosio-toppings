import ActionsModel from '../models/actions';

const get_actions = async (query: {
  account_name: string,
  records_count: string
}) => {
  try{
    let { account_name, records_count } = query;
    let result: object;

    let query_gen = ActionsModel
    .find({},
    {
      "receipt.global_sequence": 1,
      "act.name": 1,
      "act.account": 1,
      "trx_id": 1,
      "createdAt": 1,
      "_id": 1,
      "act.authorization": 1,
      "block_num": 1,
      "block_time": 1
    });

    (account_name !== undefined) ?
      query_gen.where("act.account").equals(account_name) : "";

    query_gen.where("act.name").ne("onblock");
    query_gen.where("except").equals(null);

    (records_count !== undefined) ?
        query_gen.limit(parseInt(records_count)): query_gen.limit(100);  

    query_gen.sort({block_num: -1});

    result = await query_gen.exec();
    return result;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export default get_actions;
