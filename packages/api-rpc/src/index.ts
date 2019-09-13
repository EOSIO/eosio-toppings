import get_info from './api/get_info';
import create_account from "./api/create_account";
import push_action from './api/push_action';
import get_table_rows from './api/get_table_rows';
import get_account_details from './api/get_account_details';
import update_auth from './api/update_auth';
import get_abi from './api/get_abi';
import get_block from './api/get_block';
import stake_cpu from './api/stake_cpu';
import unstake_cpu from './api/unstake_cpu';
import stake_net from './api/stake_net';
import unstake_net from './api/unstake_net';
import buy_ram from './api/buy_ram';
import sell_ram from './api/sell_ram';
import create_account_with_delegate from './api/create_account_with_delegate';


export default {
    get_info,
    create_account,
    push_action,
    get_table_rows,
    get_account_details,
    update_auth,
    get_abi,
    get_block,
    stake_cpu,
    unstake_cpu,
    stake_net,
    unstake_net,
    buy_ram,
    sell_ram,
    create_account_with_delegate
}
