import { getQueueQuery } from '$lib/index.js'

export async function load({params}){
    return { code: params.code }
}