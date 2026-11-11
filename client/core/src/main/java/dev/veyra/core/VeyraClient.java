// SPDX-License-Identifier: GPL-3.0-only
package dev.veyra.core;

import net.fabricmc.api.ClientModInitializer;
import net.fabricmc.loader.api.FabricLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** VEYRA client entrypoint. The launcher and CI smoke tests look for the init log line below. */
public final class VeyraClient implements ClientModInitializer {
    public static final String MOD_ID = "veyra";
    private static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    @Override
    public void onInitializeClient() {
        String version = FabricLoader.getInstance()
                .getModContainer(MOD_ID)
                .map(c -> c.getMetadata().getVersion().getFriendlyString())
                .orElse("unknown");
        LOGGER.info("VEYRA core initialized {}", version);
    }
}
