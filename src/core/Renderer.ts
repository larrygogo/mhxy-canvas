export class Renderer {
  private static instance: Renderer;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
  }

  public static getInstance(): Renderer {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }
    return Renderer.instance;
  }

  public setCanvasSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public render(image: HTMLImageElement, x: number, y: number): void {
    this.context.drawImage(image, x, y);
  }
}

