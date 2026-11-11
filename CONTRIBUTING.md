# Contributing to VEYRA

Thanks for helping.

## Before you start

- Small fixes: open a pull request directly.
- Anything larger, or anything that adds a dependency: open an issue first so we can agree on the approach.
- Security problems: **do not open a public issue**. See [SECURITY.md](SECURITY.md).

## Rules

1. **DCO sign-off.** Every commit needs `Signed-off-by: Your Name <email>` (`git commit -s`). This certifies the [Developer Certificate of Origin 1.1](https://developercertificate.org/). There is no CLA.
2. **Commit messages** follow Conventional Commits (`feat(client): …`, `fix(launcher): …`).
3. **Tests.** New behaviour comes with tests, and CI must pass.
4. **No copied code under an incompatible licence**, no decompiled or leaked code, no Minecraft assets, no assets from other clients.
5. **Licence headers.** New source files carry an SPDX header matching [REUSE.toml](REUSE.toml).
6. **Code style:**
   - Java: `./gradlew spotlessApply`.
   - Rust: `cargo fmt` and `cargo clippy -- -D warnings`. No `unsafe`; no `unwrap`/`expect`/`panic!` outside tests.
   - Go: `gofmt` and `go vet`.

## Review

A maintainer reviews and merges every pull request.
