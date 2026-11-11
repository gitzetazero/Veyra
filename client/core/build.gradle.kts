// SPDX-License-Identifier: GPL-3.0-only
plugins {
    alias(libs.plugins.fabric.loom)
}

base { archivesName = "veyra" }

dependencies {
    minecraft(libs.minecraft)
    implementation(libs.fabric.loader)
    implementation(libs.fabric.api)
    implementation(project(":api"))
    include(project(":api"))
}

tasks.processResources {
    val version = project.version
    inputs.property("version", version)
    filesMatching("fabric.mod.json") { expand("version" to version) }
}
