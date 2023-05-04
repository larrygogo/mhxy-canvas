import { EventEmitter } from './EventEmitter';
import { ResourceManager } from './ResourceManager';
import { Renderer } from './Renderer';

export class Engine {
  private static instance: Engine;
  private isRunning: boolean = false;
  private lastFrameTime: number = 0;

  private constructor(
    private eventEmitter: EventEmitter,
    private resourceManager: ResourceManager,
    private renderer: Renderer,
  ) {}

  public static getInstance(): Engine {
    if (!Engine.instance) {
      const eventEmitter = EventEmitter.getInstance();
      const resourceManager = ResourceManager.getInstance();
      const renderer = Renderer.getInstance();
      Engine.instance = new Engine(eventEmitter, resourceManager, renderer);
    }
    return Engine.instance;
  }

  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameLoop();
    }
  }

  private gameLoop(): void {
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    // 游戏循环逻辑，比如更新游戏对象的状态、处理用户事件、绘制游戏画面等
    // ...

    if (this.isRunning) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}
