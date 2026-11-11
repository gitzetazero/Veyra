// SPDX-License-Identifier: GPL-3.0-only
pluginManagement {
    repositories {
        maven("https://maven.fabricmc.net/") { name = "Fabric" }
        mavenCentral()
        gradlePluginPortal()
    }
}

rootProject.name = "veyra-client"

include("api", "core", "modules")
