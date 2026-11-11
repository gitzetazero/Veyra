# VEYRA

VEYRA is an open-source launcher and client for Minecraft: Java Edition.

> **Status: early development.** Nothing is playable yet.

VEYRA is not affiliated with or endorsed by Mojang Studios or Microsoft. "Minecraft" is a trademark of Mojang Synergies AB.

## Components

| Path | What | Language | Licence |
|---|---|---|---|
| `client/` | Fabric mod for Minecraft 26.3 (`api`, `core`, `modules`) | Java 25 | GPL-3.0-only; `client/api` Apache-2.0 |
| `crates/launcher-core/` | Launcher core: install, Java runtime, instances, integrity, launch, accounts | Rust | GPL-3.0-only |
| `crates/manifest/` | Release manifest schema and signature verification | Rust | Apache-2.0 |
| `tools/release/` | Release tooling: builds and signs the manifest | Go | GPL-3.0-only |

The launcher application (Tauri 2, Rust backend with a web UI) will live in `apps/launcher/`.

## Technical decisions

- **Minecraft 26.3, Fabric, Java 25, Mojang mappings.** The client renders only through Minecraft's rendering abstractions. Direct OpenGL calls are forbidden, and the build fails on them, because Minecraft is moving to Vulkan.
- **Signed releases.** Each release publishes a `manifest.json` with SHA-256 hashes of every file and a detached Ed25519 signature. The launcher verifies both before every launch.
- **Microsoft login.** VEYRA uses its own Microsoft Entra application, with the client ID taken from `VEYRA_MSA_CLIENT_ID` at build time; forks must register their own. Tokens are encrypted with a key held in the OS credential store and are never written in plain text. Releases with Microsoft login need Mojang/Microsoft to approve the application first.
- **Official and custom modes.** Official instances must match the signed manifest. Custom instances can run anything and are labelled "Custom", with no penalty.

## What VEYRA does not do

- **It is not anti-cheat.** Signing and integrity checks prove you run the files VEYRA published. They cannot stop anyone from modifying software on their own computer, and servers must not treat VEYRA as a guarantee about a player's client.
- No kernel drivers, process scanning or obfuscation.
- No telemetry.
- No paid features.

## Building

Requirements: JDK 25, Rust (version in `rust-toolchain.toml`; on Windows also the Visual Studio C++ Build Tools), Go 1.27.

```bash
cd client && ./gradlew build
```

```bash
cargo test --workspace
```

```bash
cd tools/release && go test ./...
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Report security issues privately as described in [SECURITY.md](SECURITY.md).

## Licence

- Launcher, tools, client core and modules: **GPL-3.0-only**
- `client/api` and `crates/manifest`: **Apache-2.0**
- Documentation: **CC-BY-4.0**
- Name and logo: not licensed; see [TRADEMARKS.md](TRADEMARKS.md)

See [LICENSE](LICENSE) and [REUSE.toml](REUSE.toml) for the mapping from paths to licences.
