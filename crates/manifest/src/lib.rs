// SPDX-License-Identifier: Apache-2.0
//! VEYRA release manifest: schema and verification of the detached
//! Ed25519 signature over the exact file bytes. Test vectors shared with the Go signer live in `testdata/`.
#![forbid(unsafe_code)]

/// Crate name, used by smoke tests until the schema exists.
pub const CRATE_NAME: &str = env!("CARGO_PKG_NAME");

#[cfg(test)]
mod tests {
    #[test]
    fn crate_builds() {
        assert_eq!(super::CRATE_NAME, "veyra-manifest");
    }
}
