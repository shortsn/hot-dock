import { ImageInfo, ContainerInfo } from 'dockerode';

export interface IDocker {
  images: ImageInfo[];
  containers: ContainerInfo[];
  recentEvents: DockerEvent[];
  info: DockerSystemInfo;
}

export interface DockerEvent {
  time: number;
  Type: string;
  Action: string;
  Actor: {
    ID: string;
    Attributes: {
      name: string;
    };
  };
}

export interface DockerSystemInfo {
  Architecture: string;
  Containers: number;
  ContainersPaused: number;
  ContainersRunning: number;
  ContainersStopped: number;
  Images: number;
  DockerRootDir: string;
  MemTotal: string;
  MemoryLimit: string;
  NCPU: string;
  OSType: string;
  OperatingSystem: string;
  ServerVersion: string;
}

export class DockerImage {
  public readonly repository: string;
  public readonly tags: string[] = [];

  constructor(public imageInfo: ImageInfo) {
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

export type ContainerState = 'created' | 'restarting' | 'running' | 'paused' | 'exited';

export class DockerContainer {
  public readonly names: string[];

  constructor(public containerInfo: ContainerInfo) {
    this.names = containerInfo.Names.map(name => name.substring(1));
  }
}
