// SPDX-License-Identifier: GPL-3.0-only
//! VEYRA launcher core. Planned modules:
//! `paths`, `net` (downloader), `log`, `settings`, `install`, `java`, `instances`, `integrity`, `launch`, `accounts`.
#![forbid(unsafe_code)]

/// Crate name, used by smoke tests until real modules exist.
pub const CRATE_NAME: &str = env!("CARGO_PKG_NAME");

#[cfg(test)]
mod tests {
    #[test]
    fn crate_builds() {
        assert_eq!(super::CRATE_NAME, "veyra-launcher-core");
    }
}
