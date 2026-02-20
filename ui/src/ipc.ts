import { invoke } from '@tauri-apps/api/core';
import { isTauri } from '~/utils/common';
import type { ImageInfo, PlatformSettings, ScanCmd, Settings } from '~/types';

function safeInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (!isTauri()) {
    return new Promise(() => {});
  }
  return invoke<T>(cmd, args);
}

interface MoveFilesOptions {
  paths: string[];
  destination: string;
  copyMode: boolean;
  preserveStructure: boolean;
  overrideMode: boolean;
}

interface DeleteFilesOptions {
  paths: string[];
  moveDeletedFilesToTrash: boolean;
  isEmptyFoldersTool: boolean;
}

interface SaveResultOptions {
  currentTool: string;
  destination: string;
}

interface RenameExtOptions {
  items: {
    path: string;
    ext: string;
  }[];
}

export const ipc = {
  getPlatformSettings(): Promise<PlatformSettings> {
    return safeInvoke('get_platform_settings');
  },

  setupNumberOfThreads(numberOfThreads: number): Promise<number> {
    return safeInvoke('setup_number_of_threads', { numberOfThreads });
  },

  scan(scanCmd: ScanCmd, settings: Settings) {
    return safeInvoke(scanCmd, { settings });
  },

  startListenScanProgress() {
    return safeInvoke('listen_scan_progress');
  },

  stopScan() {
    return safeInvoke('stop_scan');
  },

  readImage(path: string): Promise<ImageInfo> {
    return safeInvoke('read_image', { path });
  },

  moveFiles(options: MoveFilesOptions) {
    return safeInvoke('move_files', { options });
  },

  deleteFiles(options: DeleteFilesOptions) {
    return safeInvoke('delete_files', { options });
  },

  saveResult(options: SaveResultOptions) {
    return safeInvoke('save_result', { options });
  },

  renameExt(options: RenameExtOptions) {
    return safeInvoke('rename_ext', { options });
  },
};
