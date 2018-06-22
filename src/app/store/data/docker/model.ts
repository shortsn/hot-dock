import { ImageInfo } from 'dockerode';

export enum DockerHealth {
  UNKNOWN,
  HEALTHY,
  UNHEALTHY
}

export interface IDocker {
  dockerHealth: DockerHealth;
  images: ImageInfo[];
}

const shaRegex = /sha256:(.{12})/;

export class DockerImage {
  public readonly id: string;
  public readonly repository: string;
  public readonly created: Date;
  public readonly tags: string[] = [];
  public readonly size: number;

  constructor(public imageInfo: ImageInfo) {
    this.id = shaRegex.exec(imageInfo.Id).pop();
    this.created = new Date(imageInfo.Created * 1000);
    this.size = this.imageInfo.Size;

    const tag = imageInfo.RepoTags[0];
    this.repository = tag.substring(0, tag.indexOf(':'));

    for (let index = 0; index < imageInfo.RepoTags.length; index++) {
      const parts = imageInfo.RepoTags[index].split(':', 2);

      if (index === 0) {
        this.repository = parts[0];
      }
      this.tags.push(parts[1]);
    }
  }

}
