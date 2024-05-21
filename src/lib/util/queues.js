const queuesKey = "online-queue-queues";
const ownedQueuesKey = "online-queue-owned-queues";

export function getQueues() {
    let queues;
    if (localStorage.getItem(queuesKey)) {
        queues = JSON.parse(localStorage.getItem(queuesKey));
    } else {
        queues = [];
    }
    return queues;
}

export function addToQueues(queue) {
    const queues = getQueues();
    queues.push(queue);
    localStorage.setItem(queuesKey, JSON.stringify(queues));
}

export function getPersonNameFromQueue(queueCode) {
    const queues = getQueues();
    const queue = queues.find(q => q.queueId == queueCode);
    return queue ? queue.personName : null;
}

export function ifPersonOnQueue(queueCode) {
    const queues = getQueues();
    return queues.some(q => q.queueId == queueCode);
}

export function getOwnedQueues() {
    let ownedQueues;
    if (localStorage.getItem(ownedQueuesKey)) {
        ownedQueues = JSON.parse(localStorage.getItem(ownedQueuesKey));
    } else {
        ownedQueues = [];
    }
    return ownedQueues;
}

export function addToOwnedQueues(queueCode) {
    let ownedQueues = getOwnedQueues();
    ownedQueues.push(queueCode);
    localStorage.setItem(ownedQueuesKey, JSON.stringify(ownedQueues));
}

export function doesUserOwnQueue(queueCode) {
    let ownedQueues = getOwnedQueues();
    return ownedQueues.some(q => q == queueCode);
}
