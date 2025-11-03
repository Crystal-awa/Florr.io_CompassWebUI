import {computed, ref} from "vue";

export const cards = ref<Card[]>([]);
export const language = ref("english");
export const filteredCards = computed(() => {
    return cards.value.filter(card => {
        if (card.language !== language.value) return false;
        if (card.region.includes("Juliett") && !showRegion.value["US"]) return false;
        if (card.region.includes("Romeo") && !showRegion.value["EU"]) return false;
        return !(card.region.includes("Sierra") && !showRegion.value["AS"]);
    });
});
export const statusColor = ref("red");
export const onlineStatus = ref(false);
type Region = 'US' | 'EU' | 'AS';
export const showRegion = ref<Record<Region, boolean>>({
    US: true,
    EU: true,
    AS: true,
});
export function changeRegion(region: Region) {
    if (showRegion.value[region] !== undefined)
        showRegion.value[region] = !showRegion.value[region];
}
export function getRegion(region: Region) {
    return showRegion.value[region];
}
const addCard = (card: Card) => {
    cards.value.unshift(card);
};
const historyCard = (card: Card) => {
    cards.value.push(card);
};
function getCurrentTime(time?: string | Date) {
    const now = time ? new Date(time) : new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

let ws: WebSocket;
let reconnectTimer: number | null = null;
let currentNextId : number | null = null;
export const isLoading = ref(false);
export const hasMore = ref(true);
export function sendMessage(msg: string) {
    if (isLoading.value) {
        console.log('正在加载中，请稍候...');
        return;
    }
    isLoading.value = true;
    ws.send(JSON.stringify({
        type: msg,
        id: currentNextId
    }));
}
function createWebSocket(url: string) {
    const connect = () => {
        ws = new WebSocket(url);

        ws.onopen = () => {
            statusColor.value = "green";
            onlineStatus.value = true;
            console.log('WebSocket 已连接');
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if(data.type === "superping"){
                if(!currentNextId) currentNextId = data.id;
                addCard({
                    id: data.id,
                    super: data.imageBase64,
                    region: data.server,
                    time: getCurrentTime(),
                    report: data.content,
                    language: data.language,
                })
            }
            else if(data.type === "history"){
                historyCard({
                    id: data.id,
                    super: data.imageBase64,
                    region: data.server,
                    time: getCurrentTime(data.time),
                    report: data.content,
                    language: data.language,
                })
            }
            else if (data.type === 'history_end') {
                currentNextId = data.nextId;
                hasMore.value = data.hasMore;
                isLoading.value = false;
            }
        };

        ws.onerror = (err) => {
            console.error('WebSocket 出错', err);
            isLoading.value = false;
        };

        ws.onclose = () => {
            statusColor.value = "red";
            onlineStatus.value = false;
            console.warn('WebSocket 已关闭，尝试重连...');
            if (!reconnectTimer) {
                reconnectTimer = window.setTimeout(connect, 3000);
            }
        };
    };
    connect();
}

// createWebSocket('ws://localhost:8080');
createWebSocket('wss://compass.betterflorr.top/ws');

window.addCard = addCard;