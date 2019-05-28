import TransactionsModel from '../models/transactions';

const get_transactions = async (query: {
  id: string,
  records_count: string
}) => {
  try{
    let { id, records_count } = query;

    let result: object;

    let query_gen = TransactionsModel
      .find({},
        {
          "trx_id": 1,
          "block_num": 1,
          "accepted": 1,
          "expiration": 1,
          "createdAt": 1
        });

    (id !== undefined) ?
      query_gen.where({trx_id: id}) : query_gen.exists("block_num");

    (records_count !== undefined) ?
      query_gen.limit(parseInt(records_count)): query_gen.limit(100);  

    query_gen.sort({_id: -1});
    result = await query_gen.exec();

    return result;
  }catch(err){
    console.log(err);
  }
}

export default get_transactions;
