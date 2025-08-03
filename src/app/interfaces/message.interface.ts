export interface IMessage {
    text: string;
    isGpt: boolean;
    audioUrl?: string; // Optional field for audio URL
    info?: {
        score?: number;
        corrections?: string[];
        message?: string;
    }
}