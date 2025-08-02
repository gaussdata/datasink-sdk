import { AutoCollector } from "./modules/AutoCollector";
import { GaussEvent } from "./modules/Event";
import { Queue } from "./modules/Queue";

export default class Reporter {

    private static instance: Reporter;

    private readonly queue: Queue<GaussEvent>;

    private readonly maxQueueSize: number = 1000;

    private timer = 0;

    private isConsuming: boolean = false;

    private url = '/t';

    private constructor() {
        this.queue = new Queue<GaussEvent>(this.maxQueueSize);
        this.timer = setInterval(() => {
            this.consume();
        }, 1000);
        new AutoCollector().init(this);
    }

    static getInstance() {
        if (!Reporter.instance) {
            Reporter.instance = new Reporter();
        }
        return Reporter.instance;
    }

    static setUrl(url: string) {
        this.getInstance().url = url;
    }

    public track(code: string, data: Record<string, any>) {
        if ((window as any).doNotTrack || navigator.doNotTrack) {
            return;
        }
        const event = new GaussEvent(code, data);
        this.queue.enqueue(event);
    }

    /**
     * 消费队列数据，每10条合并为一个数组
     * @returns 二维数组，每个子数组最多包含10条数据
     */
    private consume(): void {
        if (this.isConsuming || this.queue.isEmpty()) {
            return;
        }

        this.isConsuming = true;
        try {
            const batchSize = 10;
            const batches: GaussEvent[][] = [];
            let currentBatch: GaussEvent[] = [];

            while (!this.queue.isEmpty()) {
                const event = this.queue.dequeue();
                if (event) {
                    currentBatch.push(event);
                    
                    // 每10条组成一个批次
                    if (currentBatch.length === batchSize) {
                        batches.push(currentBatch);
                        currentBatch = [];
                    }
                }
            }

            // 添加剩余不足10条的批次
            if (currentBatch.length > 0) {
                batches.push(currentBatch);
            }

            // 处理所有批次数据
            this.processBatches(batches);
        } finally {
            this.isConsuming = false;
        }
    }

    /**
     * 处理批次数据（示例方法，需根据实际需求实现）
     * @param batches 二维事件数组
     */
    private processBatches(batches: GaussEvent[][]): void {
        batches.forEach((batch, index) => {
            console.log(`Processing batch ${index + 1} with ${batch.length} events`);
            const data = batch.map(GaussEvent.toJson);
            navigator.sendBeacon(this.url, JSON.stringify(data))
        });
    }

     /**
     * 销毁定时器
     */
    public destroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}