import type Reporter from "../Reporter";

/**
 * 自动埋点，监听页面加载、页面浏览、页面离开、元素点击等事件
 */
export class AutoCollector {

    reporter: Reporter | null = null;

    startTime = Date.now();

    /**
     * 初始化事件监听
     */
    public init(reporter: Reporter): void {
        this.reporter = reporter;
        setTimeout(() => {
            this.onPageLoad();
            setTimeout(() => {
                this.onPageView();
            })
        })
        document.addEventListener('click', (e) => {
            this.onClick(e)
        })
    }

    private onClick(e: MouseEvent) {
        const element = e.target as HTMLElement;
        this.reporter?.track('$element_click', {
            element_content: element.innerText,
            element_id: element.id,
            page_x: e.pageX,
            page_y: e.pageY
        })
    }

    onPageLoad() {
        this.reporter?.track('$page_load', {})
    }

    onPageView() {
        this.startTime = Date.now();
        this.reporter?.track('$page_view', {})
    }

    onPageLeave() {
        this.reporter?.track('$page_leave', {
            duration: Date.now() - this.startTime
        })
    }
}