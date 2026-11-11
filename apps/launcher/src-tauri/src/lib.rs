// SPDX-License-Identifier: GPL-3.0-only
//! VEYRA launcher desktop app. The UI talks to Rust only through the commands registered here.
#![forbid(unsafe_code)]

use serde::Serialize;

/// Basic facts the UI shows in Settings and the window footer.
#[derive(Serialize)]
struct AppInfo {
    version: &'static str,
    os: &'static str,
    arch: &'static str,
}

#[tauri::command]
fn app_info() -> AppInfo {
    AppInfo {
        version: env!("CARGO_PKG_VERSION"),
        os: std::env::consts::OS,
        arch: std::env::consts::ARCH,
    }
}

/// Starts the app. Exits with status 1 if the window cannot be created.
pub fn run() {
    let result = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![app_info])
        .run(tauri::generate_context!());
    if let Err(err) = result {
        eprintln!("VEYRA failed to start: {err}");
        std::process::exit(1);
    }
}
