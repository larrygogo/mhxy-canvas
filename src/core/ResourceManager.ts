export class ResourceManager {
  private static instance: ResourceManager;
  private resourceMap: Record<string, HTMLImageElement> = {};

  private constructor() {}

  public static getInstance(): ResourceManager {
    if (!ResourceManager.instance) {
      ResourceManager.instance = new ResourceManager();
    }
    return ResourceManager.instance;
  }

  public loadResource(url: string): Promise<HTMLImageElement> {
    if (this.resourceMap[url]) {
      return Promise.resolve(this.resourceMap[url]);
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        this.resourceMap[url] = image;
        resolve(image);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = url;
    });
  }

  public getResource(url: string): HTMLImageElement | undefined {
    return this.resourceMap[url];
  }
}
