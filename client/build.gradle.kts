// SPDX-License-Identifier: GPL-3.0-only
plugins {
    alias(libs.plugins.fabric.loom) apply false
    alias(libs.plugins.spotless) apply false
}

subprojects {
    apply(plugin = "java-library")
    apply(plugin = "com.diffplug.spotless")

    repositories { mavenCentral() }

    extensions.configure<JavaPluginExtension> {
        toolchain.languageVersion = JavaLanguageVersion.of(25)
    }

    tasks.withType<JavaCompile>().configureEach {
        options.release = 25
        options.encoding = "UTF-8"
    }

    extensions.configure<com.diffplug.gradle.spotless.SpotlessExtension> {
        java {
            palantirJavaFormat(rootProject.libs.versions.palantir.java.format.get())
            removeUnusedImports()
        }
    }

    dependencies {
        "testImplementation"(platform(rootProject.libs.junit.bom))
        "testImplementation"(rootProject.libs.junit.jupiter)
        "testRuntimeOnly"(rootProject.libs.junit.launcher)
    }

    tasks.withType<Test>().configureEach { useJUnitPlatform() }

    // Minecraft is moving to Vulkan; VEYRA never calls OpenGL directly.
    val checkNoRawOpenGl = tasks.register("checkNoRawOpenGl") {
        val sources = fileTree("src") { include("**/*.java") }
        inputs.files(sources)
        doLast {
            val offenders = sources.files.filter { it.readText().contains("org.lwjgl.opengl") }
            if (offenders.isNotEmpty()) {
                throw GradleException("Raw OpenGL is forbidden: ${offenders.joinToString()}")
            }
        }
    }
    tasks.named("check") { dependsOn(checkNoRawOpenGl) }
}
