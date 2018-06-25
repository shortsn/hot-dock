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
  info: DockerSystemInfo;
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
  public readonly id: string;
  public readonly names: string[];
  public readonly ports: string[];

  constructor(public containerInfo: ContainerInfo) {
    this.id = containerInfo.Id.substring(0, 12);
    this.names = containerInfo.Names.map(name => name.substring(1));
    this.ports = containerInfo.Ports.map(port => `${port.PrivatePort}:${port.PublicPort}`);
  }
}
