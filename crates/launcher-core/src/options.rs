// SPDX-License-Identifier: GPL-3.0-only
//! Minecraft's `options.txt`: one `key:value` per line. The launcher writes the `lang` option before every
//! launch, so each instance starts in the launcher's language.

use thiserror::Error;

#[derive(Debug, Error, PartialEq, Eq)]
pub enum OptionsError {
    /// Not a Minecraft language code such as `en_us`, `es_es` or `zlm_arab`.
    #[error("invalid Minecraft language code: {0:?}")]
    InvalidLanguage(String),
}

/// Minecraft language codes are one or two `_`-separated parts of 2–4 lowercase ASCII letters
/// (e.g. `es_es`, `zlm_arab`, `tok`).
pub fn is_valid_language_code(code: &str) -> bool {
    let parts: Vec<&str> = code.split('_').collect();
    (1..=2).contains(&parts.len())
        && parts
            .iter()
            .all(|p| (2..=4).contains(&p.len()) && p.bytes().all(|b| b.is_ascii_lowercase()))
}

/// Returns `options` with its `lang` line set to `code`, keeping every other line and the original line endings.
/// Adds the line when it is missing (a fresh instance has no `options.txt` yet: pass an empty string).
pub fn with_language(options: &str, code: &str) -> Result<String, OptionsError> {
    if !is_valid_language_code(code) {
        return Err(OptionsError::InvalidLanguage(code.to_owned()));
    }
    let newline = if options.contains("\r\n") {
        "\r\n"
    } else {
        "\n"
    };
    let mut found = false;
    let mut lines: Vec<String> = options
        .lines()
        .map(|line| {
            if line.split_once(':').is_some_and(|(key, _)| key == "lang") {
                found = true;
                format!("lang:{code}")
            } else {
                line.to_owned()
            }
        })
        .collect();
    if !found {
        lines.push(format!("lang:{code}"));
    }
    Ok(lines.join(newline) + newline)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn replaces_existing_language_and_keeps_other_options() {
        let input = "version:4325\nlang:en_us\nfov:0.5\n";
        assert_eq!(
            with_language(input, "es_es"),
            Ok("version:4325\nlang:es_es\nfov:0.5\n".into())
        );
    }

    #[test]
    fn adds_language_to_a_new_or_incomplete_file() {
        assert_eq!(with_language("", "ja_jp"), Ok("lang:ja_jp\n".into()));
        assert_eq!(
            with_language("fov:0.5", "ja_jp"),
            Ok("fov:0.5\nlang:ja_jp\n".into())
        );
    }

    #[test]
    fn keeps_windows_line_endings() {
        assert_eq!(
            with_language("lang:en_us\r\nfov:0.5\r\n", "pt_br"),
            Ok("lang:pt_br\r\nfov:0.5\r\n".into())
        );
    }

    #[test]
    fn does_not_touch_keys_that_only_start_with_lang() {
        let input = "language_reload:true\n";
        assert_eq!(
            with_language(input, "fr_fr"),
            Ok("language_reload:true\nlang:fr_fr\n".into())
        );
    }

    #[test]
    fn rejects_codes_that_could_inject_other_options() {
        for bad in [
            "",
            "e",
            "EN_US",
            "en_us\nfov:2",
            "en_us:x",
            "a_b",
            "en_us_x",
            "../x",
        ] {
            assert_eq!(
                with_language("", bad),
                Err(OptionsError::InvalidLanguage(bad.into())),
                "{bad:?}"
            );
        }
    }

    #[test]
    fn accepts_every_shape_of_minecraft_language_code() {
        for good in ["en_us", "zlm_arab", "tok", "bar", "enws", "lzh"] {
            assert!(is_valid_language_code(good), "{good:?}");
        }
    }
}
