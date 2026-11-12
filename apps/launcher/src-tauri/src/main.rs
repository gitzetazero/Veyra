// SPDX-License-Identifier: GPL-3.0-only
// Hide the extra console window on Windows release builds.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    veyra_launcher_lib::run();
}
