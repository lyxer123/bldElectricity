import request from '@/utils/request'

const prefix = "block/";

export function search_block(data) {
    return request({
        url: prefix + 'searchBlock.json?limit=' + data.limit + '&search=' + data.search,
        method: 'get'
    })
}

export function search_block_hash(pageSize, chipId) {
    return request({
        url: prefix + 'searchBlockHash.json?pageSize=' + pageSize + '&chipId=' + chipId,
        method: 'get'
    })
}

export function block_hash_info(hash) {
    return request({
        url: prefix + 'blockHashInfo.json?hash=' + hash,
        method: 'get'
    })
}

export function block_info(blockNum) {
    return request({
        url: prefix + 'getBlockInfo.json?blockNum=' + blockNum,
        method: 'get'
    })
}