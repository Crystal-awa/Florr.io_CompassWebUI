interface Card {
    id: string;
    super: string;
    region: string;
    time: string;
    report: string;
    language: string;
}
interface Window {
    addCard: (card: Card) => void;
}
interface Message {
    region: string; // 'US' | 'EU' | 'AS'
    content: string;
}