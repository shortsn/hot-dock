import { ImageInfo, ContainerInfo } from 'dockerode';

export enum DockerHealth {
  UNKNOWN,
  HEALTHY,
  UNHEALTHY
}

export interface IDocker {
  dockerHealth: DockerHealth;
  images: ImageInfo[];
  containers: ContainerInfo[];
}

const shaRegex = /sha256:(.{12})/;

export class DockerImage {
  public readonly id: string;
  public readonly repository: string;
  public readonly created: Date;
  public readonly tags: string[] = [];

  constructor(public imageInfo: ImageInfo) {
    this.id = shaRegex.exec(imageInfo.Id).pop();
    this.created = new Date(imageInfo.Created * 1000);

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


export class DockerContainer {
  public readonly id: string;
  public readonly names: string[];

  constructor(public containerInfo: ContainerInfo) {
    this.id = containerInfo.Id.substring(0, 12);
    this.names = containerInfo.Names.map(name => name.substring(1));
  }
}
