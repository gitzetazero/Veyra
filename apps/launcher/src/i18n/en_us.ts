// SPDX-License-Identifier: GPL-3.0-only
// English (en_us): the source of every launcher string. Other languages may leave keys out; they fall back to this.

export const en_us = {
  'nav.home': 'Home',
  'nav.instances': 'Instances',
  'nav.newInstance': 'New instance',
  'nav.settings': 'Settings',
  'nav.account': 'Account',

  'instance.official': 'Official',
  'instance.custom': 'Custom',
  'instance.officialName': 'VEYRA',
  'instance.withLoader.fabric': 'Minecraft {version} with Fabric',
  'instance.withLoader.vanilla': 'Minecraft {version}',
  'instance.neverPlayed': 'Never played',

  'home.play': 'Play',
  'home.notInstalled': 'Not installed yet. The first launch downloads Minecraft and Java.',
  'home.playNotBuilt': 'Installing Minecraft is not built yet. This is an early version of the launcher.',
  'home.news': 'News',
  'news.1.title': 'First look at the launcher',
  'news.1.body': 'The VEYRA launcher has its first screens. Installing and playing come next.',
  'news.2.title': 'Your language, in the launcher and in the game',
  'news.2.body': 'Pick any language Minecraft supports and the game starts in it too.',
  'news.3.title': 'Open source from the first line',
  'news.3.body': 'Every part of the launcher and the client is public on GitHub.',

  'official.intro':
    'This is the VEYRA client. It always stays in the list, and you can reset it if something goes wrong.',
  'custom.intro': 'A custom instance can run any mods. It is labelled Custom in the launcher and in the game.',
  'instance.version': 'Minecraft version',
  'instance.versionHelp': 'VEYRA supports Minecraft 1.20 and newer. Each version keeps its own worlds and settings.',
  'instance.reset': 'Reset VEYRA',
  'instance.resetHelp': 'Reinstalls the game files and restores default settings.',
  'instance.delete': 'Delete instance',
  'instance.deleteHelp': 'Removes this instance and all its files.',

  'reset.title': 'Reset VEYRA?',
  'reset.body':
    'Game files, mods and settings go back to how VEYRA ships them. Your worlds, screenshots and resource packs are kept.',
  'reset.deleteWorlds': 'Also delete my worlds',
  'reset.confirm': 'Reset',
  'reset.done': 'VEYRA was reset.',
  'delete.title': 'Delete {name}?',
  'delete.body': 'This removes the instance and all its files, including worlds. This cannot be undone.',
  'delete.confirm': 'Delete',
  'common.cancel': 'Cancel',
  'common.previewNote': 'Preview: nothing is changed on disk yet.',

  'create.title': 'New instance',
  'create.name': 'Name',
  'create.namePlaceholder': 'My instance',
  'create.copy.title': 'Copy of VEYRA',
  'create.copy.body': 'Starts from the official client. You can add any mods to it.',
  'create.loader.title': 'Vanilla or Fabric',
  'create.loader.body': 'A clean Minecraft, with or without the Fabric mod loader.',
  'create.import.title': 'Import a modpack',
  'create.import.body': 'From Modrinth, CurseForge, Prism Launcher, MultiMC or ATLauncher.',
  'create.loader': 'Mod loader',
  'create.loader.vanilla': 'None (vanilla)',
  'create.loader.fabric': 'Fabric',
  'create.file': 'Modpack file',
  'create.fileHelp': 'Modrinth .mrpack, CurseForge .zip, Prism Launcher or MultiMC .zip, ATLauncher .zip',
  'create.detected': 'Detected: {format}',
  'create.importNotBuilt': 'Importing modpacks is not built yet.',
  'create.unknownFormat': 'This file type is not a supported modpack.',
  'create.submit': 'Create instance',
  'create.nameRequired': 'Give the instance a name.',

  'settings.title': 'Settings',
  'settings.intro': 'Changes are not saved yet; saving arrives with the launcher core.',
  'settings.language': 'Language',
  'settings.languageHelp':
    'Minecraft uses this language too: every instance starts in it. The launcher is translated into English and Spanish so far; in other languages it shows English.',
  'settings.memory': 'Memory for Minecraft',
  'settings.memoryHelp': '4 GB is enough for most players. More only helps with large modpacks.',
  'settings.hide': 'Hide VEYRA while playing',
  'settings.hideHelp': 'The launcher comes back when the game closes, so it can show crash reports.',
  'settings.about': 'About',
  'settings.aboutText': 'VEYRA {version} on {platform}. Open source under GPL-3.0-only.',

  'account.title': 'Account',
  'account.signedOut': 'Not signed in',
  'account.hint': 'Sign in with your Microsoft account to play online.',
  'account.signIn': 'Sign in with Microsoft',
  'account.notBuilt': 'Microsoft sign-in is not available yet.',
} as const;

export type MessageKey = keyof typeof en_us;
export type Messages = Partial<Record<MessageKey, string>>;
