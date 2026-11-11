// SPDX-License-Identifier: GPL-3.0-only

// Command veyra-release builds and signs VEYRA release manifests.
// It runs only in CI; the signing key comes from the protected `release` environment.
// For now it only reports its version.
package main

import (
	"fmt"
	"io"
	"os"
)

const version = "0.0.0"

func run(args []string, out io.Writer) int {
	if len(args) == 1 && args[0] == "version" {
		fmt.Fprintln(out, "veyra-release", version)
		return 0
	}
	fmt.Fprintln(out, "usage: veyra-release version")
	return 2
}

func main() {
	os.Exit(run(os.Args[1:], os.Stdout))
}
